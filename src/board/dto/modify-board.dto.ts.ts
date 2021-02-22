import { ArgsType, Field, ObjectType, PartialType } from '@nestjs/graphql';
import { CreateBoardInput, CreateBoardOutput } from './create-board.dto';

@ArgsType()
export class ModifyBoardInput extends PartialType(CreateBoardInput) {
  @Field((_) => Number)
  id: number;
}

@ObjectType()
export class ModifyBoardOutput extends PartialType(CreateBoardOutput) {}
