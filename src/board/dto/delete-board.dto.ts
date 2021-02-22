// 게시물 삭제 dto

import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateBoardOutput } from './create-board.dto';

@ArgsType()
export class DeleteBoardInput {
  @Field((_) => Number)
  id: number;
}

@ObjectType()
export class DeleteBoardOutput extends PartialType(CreateBoardOutput) {}
