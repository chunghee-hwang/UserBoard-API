// 사용자 정보 dto

import {
  ObjectType,
  PartialType,
  PickType,
  IntersectionType,
  OmitType,
} from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { User } from '../user.model';

@ObjectType()
export class UserOutput extends PartialType(
  IntersectionType(OmitType(User, ['password']), BaseOutput),
) {}
