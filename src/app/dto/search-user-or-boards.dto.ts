// 유저 아이디로 유저 정보나 유저가 작성한 게시물 검색 dto

import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { BoardOutput } from 'src/board/dto/get-boards.dto';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { UserOutput } from 'src/user/dto/user-output.dto';

@ObjectType()
export class SearchUserOutput extends OmitType(UserOutput, ['ok', 'error']) {}

@ObjectType()
export class SearchUserOrBoardsOutput extends BaseOutput {
  @Field((_) => SearchUserOutput, { nullable: true })
  user?: SearchUserOutput;

  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
