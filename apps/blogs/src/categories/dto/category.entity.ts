import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogCategoryEntity {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  sub_title: string;

  @Field()
  slug: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(partial: Partial<BlogCategoryEntity>) {
    Object.assign(this, partial);
  }
}
