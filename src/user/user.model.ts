import { Field, ObjectType } from '@nestjs/graphql';
import { Board } from '../board/board.model';
import { BaseModel } from '../shared/model/base.model';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@ObjectType()
@Entity()
export class User extends BaseModel {
  @Column()
  @Field((_) => String)
  name!: string;

  @Column()
  @Field((_) => String)
  password!: string;

  @OneToMany(
    () => Board,
    (board) => board.author,
  )
  @Field((_) => [Board])
  boards!: Board[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(pw: string): Promise<boolean> {
    try {
      return await bcrypt.compare(pw, this.password);
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
