import { Field, IntersectionType, ObjectType, OmitType } from '@nestjs/graphql';
import { UserOutput } from 'src/user/dto/user-output.dto';
import { Board } from '../board.model';

@ObjectType()
export class BoardOutput extends OmitType(Board, ['author']) {
  @Field((_) => UserOutput)
  author: UserOutput;
}
