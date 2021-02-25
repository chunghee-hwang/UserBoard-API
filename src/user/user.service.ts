import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login-user.dto';
import { UserOutputForResolver } from './dto/user-output.dto';
import { JwtService } from './jwt/jwt.service';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 계정 생성
  async createUser({
    name,
    password,
  }: CreateUserInput): Promise<UserOutputForResolver> {
    try {
      const sameUser = await this._userRepository.findOne({
        name,
      });
      if (sameUser) {
        return {
          ok: false,
          error: 'The name is in use.',
        };
      }

      const createdUser: User = await this._userRepository.create({
        name,
        password,
      });
      await this._userRepository.save(createdUser);
      return {
        ...createdUser,
        ok: true,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to create user.',
      };
    }
  }

  // 로그인
  async loginUser({ name, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this._userRepository.findOne({ name });
      if (!user) {
        return { ok: false, error: 'The username or password is not correct.' };
      }
      const isPasswordCorrect: boolean = await user.checkPassword(password);
      if (!isPasswordCorrect) {
        return { ok: false, error: 'The username or password is not correct.' };
      } else {
        return { ok: true, token: this.jwtService.getToken(user.id), user };
      }
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to login.',
      };
    }
  }

  // 계정 삭제
  async deleteUser(userId): Promise<UserOutputForResolver> {
    try {
      const user = await this.findById(userId);
      if (!user) {
        return { ok: false, error: 'The user is not exists.' };
      }
      user.deletedAt = new Date();
      await this._userRepository.save(user);
      return {
        ok: true,
        ...user,
      };
    } catch (e) {
      return {
        ok: false,
        error: 'Fail to delete user.',
      };
    }
  }

  // 아이디로 유저 정보 찾기
  async findById(id: number): Promise<User> {
    return this._userRepository.findOne({ id, deletedAt: IsNull() });
  }

  // 유저 이름으로 유저 정보 찾기
  async findByName(username: string): Promise<User> {
    return this._userRepository.findOne({
      name: username,
    });
  }
}
