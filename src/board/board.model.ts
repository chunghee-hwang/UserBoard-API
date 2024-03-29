import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../shared/model/base.model';
import { User } from '../user/user.model';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
@ObjectType()
export class Board extends BaseModel {
  @Column()
  @Field((_) => String)
  title!: string;

  @Column()
  @Field((_) => String)
  content!: string;

  @ManyToOne(
    () => User,
    (user) => user.boards,
    {
      eager: true,
    },
  )
  @Field((_) => User)
  author!: User;
}
