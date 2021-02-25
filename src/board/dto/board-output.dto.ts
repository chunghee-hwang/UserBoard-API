import { ObjectType, OmitType } from '@nestjs/graphql';
import { Board } from '../board.model';

@ObjectType()
export class BoardOutput extends OmitType(Board, ['author']) {
  author: string;
}
