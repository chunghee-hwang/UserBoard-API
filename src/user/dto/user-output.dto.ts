// 사용자 정보 dto

import { IntersectionType, ObjectType, PartialType } from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { User } from '../user.model';

@ObjectType()
export class UserOutput extends PartialType(
  IntersectionType(User, BaseOutput),
) {}
