// 사용자 생성 dto
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAccountInput {
  @Field((_) => String)
  name: string;

  @Field((_) => String)
  password: string;
}
