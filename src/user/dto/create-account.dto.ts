import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateAccountInput {
  @Field((_) => String)
  name: string;

  @Field((_) => String)
  password: string;
}
