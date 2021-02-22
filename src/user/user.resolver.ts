import { Query } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/user.create-account.dto';
import {
  DeleteAccountInput,
  DeleteAccountOutput,
} from './dto/user.delete-account.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  @Mutation((_) => CreateAccountOutput)
  async createAccount(
    @Args() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return await this._userService.createAccount(createAccountInput);
  }

  @Mutation((_) => DeleteAccountOutput)
  async deleteAccount(
    @Args() deleteAccountInput: DeleteAccountInput,
  ): Promise<DeleteAccountOutput> {
    return await this._userService.deleteAccount(deleteAccountInput);
  }
}
