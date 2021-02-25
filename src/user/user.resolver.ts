import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from './auth/auth-user.decorator';
import { AuthGuard } from './auth/auth.guard';
import { CreateUserInput } from './dto/create-user.dto';
import { LoginInput, LoginOutput } from './dto/login-user.dto';
import { UserOutput } from './dto/user-output.dto';
import { User } from './user.model';
// 사용자(계정) 서비스
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly _userService: UserService) {}

  // 계정 만들기
  @Mutation((_) => UserOutput)
  async createUser(
    @Args() createUserInput: CreateUserInput,
  ): Promise<UserOutput> {
    return this._userService.createUser(createUserInput);
  }

  // 로그인이 되어있을 때만 허락
  // 계정 삭제
  @UseGuards(AuthGuard)
  @Mutation((_) => UserOutput)
  async deleteUser(@AuthUser() authUser: User): Promise<UserOutput> {
    return this._userService.deleteUser(authUser.id);
  }

  // 로그인
  @Mutation((_) => LoginOutput)
  async loginUser(@Args() loginInput: LoginInput): Promise<LoginOutput> {
    return this._userService.loginUser(loginInput);
  }
}
