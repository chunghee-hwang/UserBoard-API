import { Query, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { AuthUser } from './auth/auth-user.decorator';
import { AuthGuard } from './auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { DeleteAccountOutput } from './dto/delete-account.dto';
import { LoginInput, LoginOutput } from './dto/login-user.dto';
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

  @UseGuards(AuthGuard)
  @Mutation((_) => DeleteAccountOutput)
  async deleteAccount(
    @AuthUser() authUser: User,
  ): Promise<DeleteAccountOutput> {
    return await this._userService.deleteAccount(authUser.id);
  }

  @Mutation((_) => LoginOutput)
  async loginUser(@Args() loginInput: LoginInput): Promise<LoginOutput> {
    return await this._userService.loginUser(loginInput);
  }
}
