import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseOutput {
  @Field((_) => String, { nullable: true })
  error?: String;

  @Field((_) => Boolean)
  ok: boolean;
}
