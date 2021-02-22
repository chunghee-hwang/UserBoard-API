// 사용자 로그인 dto

import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { CreateAccountInput } from './create-account.dto';

@ArgsType()
export class LoginInput {
  @Field((_) => String)
  name: string;

  @Field((_) => String)
  password: string;
}

@ObjectType()
export class LoginOutput extends BaseOutput {
  @Field((_) => String, { nullable: true })
  token?: string;
}
