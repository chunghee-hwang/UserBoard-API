// 게시물 생성 dto

import {
  ArgsType,
  Field,
  IntersectionType,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { BoardOutput } from './board-output.dto';

@ArgsType()
export class CreateBoardInput {
  @Field((_) => String)
  title: string;

  @Field((_) => String)
  content: string;
}

@ObjectType()
export class CreateBoardOutput extends PartialType(
  IntersectionType(BaseOutput, BoardOutput),
) {}
