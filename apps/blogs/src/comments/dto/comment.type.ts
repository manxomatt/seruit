import {
  Field,
  InputType,
  ObjectType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';
import { BaseResultType } from 'src/common/base-result.type';
import { BlogCommentEntity } from './comment.entity';

@InputType('CreateBlogCommentInput')
export class CreateBlogCommentInput {
  @Field()
  blog_id: string;

  @Field()
  user_id: string;

  @Field({ nullable: true })
  parent_id: string;

  @Field()
  comment: string;

  @Field({ nullable: true })
  likes: string;
}

@InputType('UpdateBlogCommentInput')
export class UpdateBlogCommentInput extends PickType(CreateBlogCommentInput, [
  'comment',
]) {
  @Field()
  id: string;
}

@ObjectType()
export class BlogCommentResultType extends BaseResultType<
  BlogCommentEntity | string
> {
  @Field(() => BlogCommentEntity, { nullable: true })
  result?: BlogCommentEntity;
}

@ObjectType()
export class BlogCommentsResultType extends BasePaginationResultType<
  BlogCommentEntity[]
> {
  @Field(() => [BlogCommentEntity], { nullable: true })
  result?: BlogCommentEntity[];
}
