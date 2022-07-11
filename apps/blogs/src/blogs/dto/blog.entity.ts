import { Field, ObjectType } from '@nestjs/graphql';
import { BlogCategoryEntity } from '../../categories/dto/category.entity';
import { BlogCommentEntity } from '../../comments/dto/comment.entity';

@ObjectType()
export class BlogEntity {
  @Field()
  uuid: string;

  @Field()
  category_id: string;

  @Field()
  category: BlogCategoryEntity;

  @Field()
  user_id: string;

  @Field()
  title: string;

  @Field(() => [String], { nullable: true })
  keywords: Array<string>;

  @Field({ nullable: true })
  description: string;

  @Field()
  thumbnail: string;

  @Field()
  banner: string;

  @Field()
  status: string;

  @Field(() => [BlogCommentEntity], { nullable: true })
  comments: BlogCommentEntity[];

  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;

  constructor(partial: Partial<BlogEntity>) {
    Object.assign(this, partial);
  }
}
