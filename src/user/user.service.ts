import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/user.create-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dto/user.delete-account.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private _usersRepository: Repository<User>,
  ) {
    console.log('use this repository user', User);
  }
  async createAccount({
    name,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
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

  async deleteAccount({
    id,
  }: DeleteAccountInput): Promise<DeleteAccountOutput> {
    try {
      const account = await this._usersRepository
        .createQueryBuilder('user')
        .where(`user.id = ${id} AND user.deletedAt IS NULL`)
        .getOne();
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
}
