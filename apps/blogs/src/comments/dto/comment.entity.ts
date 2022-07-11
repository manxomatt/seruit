import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogCommentEntity {
  @Field()
  uuid: string;

  @Field()
  blog_id: string;

  @Field()
  user_id: string;

  @Field({ defaultValue: null, nullable: true })
  parent_id: string;

  @Field()
  comment: string;

  @Field({ nullable: true })
  likes: string;

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(partial: Partial<BlogCommentEntity>) {
    Object.assign(this, partial);
  }
}
