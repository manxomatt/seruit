import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';
import { BaseResultType } from 'src/common/base-result.type';
import { BlogCategoryEntity } from './category.entity';

@ObjectType()
export class CategoryResultType extends BaseResultType<
  BlogCategoryEntity | string
> {
  @Field(() => BlogCategoryEntity, { nullable: true })
  result?: BlogCategoryEntity;
}

@ObjectType()
export class CategoriesResultType extends BasePaginationResultType<
  BlogCategoryEntity[]
> {
  @Field(() => [BlogCategoryEntity], { nullable: true })
  result?: BlogCategoryEntity[];
}

@InputType('CreateBlogCategoryInput')
export class CreateBlogCategoryInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field({ nullable: true })
  sub_title: string;

  @Field({ nullable: true })
  slug: string;
}

@InputType('UpdateBlogCategoryInput')
export class UpdateBlogCategoryInput extends PartialType(
  CreateBlogCategoryInput,
) {
  @Field()
  id: string;
}
