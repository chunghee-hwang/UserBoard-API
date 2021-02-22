import { ArgsType, Field, ID, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateAccountOutput } from './user.create-account.dto';
@ArgsType()
export class DeleteAccountInput {
  @Field((_) => Number)
  id: number;
}

@ObjectType()
export class DeleteAccountOutput extends PartialType(CreateAccountOutput) {}
