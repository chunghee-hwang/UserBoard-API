// 사용자 정보 dto

import {
  IntersectionType,
  ObjectType,
  OmitType,
  PartialType,
} from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { User } from '../user.model';

@ObjectType()
export class UserOutput extends OmitType(User, ['password', 'boards']) {}

@ObjectType()
export class UserOutputForResolver extends PartialType(
  IntersectionType(OmitType(User, ['password', 'boards']), BaseOutput),
) {}
