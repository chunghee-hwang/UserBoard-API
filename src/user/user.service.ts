import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateAccountInput } from './dto/create-account.dto';
import { LoginInput, LoginOutput } from './dto/login-user.dto';
import { UserOutput } from './dto/user-output.dto';
import { JwtService } from './jwt/jwt.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 계정 생성
  async createAccount({
    name,
    password,
  }: CreateAccountInput): Promise<UserOutput> {
    try {
      const sameUser = await this._usersRepository.findOne({
        name,
      });
      if (sameUser) {
        return {
          ok: false,
          error: 'The name is in use.',
        };
      }

      const createdUser: User = await this._usersRepository.create({
        name,
        password,
      });
      await this._usersRepository.save(createdUser);
      return {
        ok: true,
        ...createdUser,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to create account.',
      };
    }
  }

  // 로그인
  async loginUser({ name, password }: LoginInput): Promise<LoginOutput> {
    try {
      const account = await this._usersRepository.findOne({ name });
      if (!account) {
        return { ok: false, error: 'The username or password is not correct.' };
      }

      const isPasswordCorrect: boolean = await account.checkPassword(password);
      if (!isPasswordCorrect) {
        return { ok: false, error: 'The username or password is not correct.' };
      } else {
        return { ok: true, token: this.jwtService.getToken(account.id) };
      }
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to login.',
      };
    }
  }

  // 계정 삭제
  async deleteAccount(userId): Promise<UserOutput> {
    try {
      const account = await this.findById(userId);
      if (!account) {
        return { ok: false, error: 'The user is not exists.' };
      }
      account.deletedAt = new Date();
      await this._usersRepository.save(account);
      return {
        ok: true,
        ...account,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to delete account.',
      };
    }
  }

  // 아이디로 유저 정보 찾기
  async findById(id: number): Promise<User> {
    return await this._usersRepository.findOne({ id, deletedAt: IsNull() });
  }
}
