import { Field, ObjectType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
export class UserEntity {
  @Field()
  uuid: string;

  @Field()
  first_name?: string;

  @Field()
  last_name?: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  status: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
