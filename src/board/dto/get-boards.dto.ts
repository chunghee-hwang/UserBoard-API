// 여러 게시물 가져오기 dto

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { BoardOutput } from './board-output.dto';
@ObjectType()
export class GetBoardsOutput extends BaseOutput {
  @Field((_) => [BoardOutput], { nullable: true })
  boards?: BoardOutput[];
}
