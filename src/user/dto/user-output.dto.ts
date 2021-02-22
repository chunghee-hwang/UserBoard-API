// 사용자 정보 dto

import {
  ObjectType,
  PartialType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { User } from '../user.model';

@ObjectType()
export class UserOutput extends PartialType(
  PickType(IntersectionType(User, BaseOutput), ['id', 'name', 'ok', 'error']),
) {}
