import {
  ArgsType,
  Field,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { BaseOutput } from 'src/shared/dto/base.output.dto';
import { User } from '../user.model';

@ArgsType()
export class CreateAccountInput {
  @Field((_) => String)
  name: string;

  @Field((_) => String)
  password: string;
}

@ObjectType()
export class CreateAccountOutput extends PartialType(
  PickType(IntersectionType(User, BaseOutput), ['id', 'name', 'ok', 'error']),
) {}
