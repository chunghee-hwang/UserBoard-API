// 여러 게시물 가져오기 dto

import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { Board } from '../board.model';

@ObjectType()
class BoardOutput extends PickType(Board, ['id', 'title', 'content']) {}

@ObjectType()
export class GetBoardsOutput extends BaseOutput {
  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
