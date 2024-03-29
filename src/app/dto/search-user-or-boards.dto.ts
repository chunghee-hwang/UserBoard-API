// 유저 아이디로 유저 정보나 유저가 작성한 게시물 검색 dto

import { Field, ObjectType } from '@nestjs/graphql';
import { BoardOutput } from 'src/board/dto/board-output.dto';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { UserOutput } from 'src/user/dto/user-output.dto';

@ObjectType()
export class SearchUserOrBoardsOutput extends BaseOutput {
  @Field((_) => UserOutput, { nullable: true })
  user?: UserOutput;

  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
