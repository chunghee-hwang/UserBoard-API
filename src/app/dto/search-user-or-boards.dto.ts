import { Field, ObjectType, PartialType } from '@nestjs/graphql';
import { BoardOutput } from 'src/board/dto/get-boards.dto';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { CreateAccountOutput } from 'src/user/dto/create-account.dto';

@ObjectType()
class UserOutput extends CreateAccountOutput {}

@ObjectType()
export class SearchUserOrBoardsOutput extends BaseOutput {
  @Field((_) => UserOutput, { nullable: true })
  user?: UserOutput;

  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
