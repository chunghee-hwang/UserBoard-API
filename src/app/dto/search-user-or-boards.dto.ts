import { Field, ObjectType } from '@nestjs/graphql';
import { BoardOutput } from 'src/board/dto/get-boards.dto';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { UserOutput } from 'src/user/dto/user-output.dto';

@ObjectType()
export class SearchUserOrBoardsOutput extends BaseOutput {
  @Field((_) => UserOutput, { nullable: true })
  user?: UserOutput;

  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
