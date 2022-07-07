import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';
import { BaseResultType } from 'src/common/base-result.type';
import { BlogEntity } from './blog.entity';

@ObjectType()
export class BlogResultType extends BaseResultType<BlogEntity | string> {
  @Field(() => BlogEntity, { nullable: true })
  result?: BlogEntity;
}

@ObjectType()
export class BlogsResultType extends BasePaginationResultType<BlogEntity[]> {
  @Field(() => [BlogEntity], { nullable: true })
  result?: BlogEntity[];
}

@InputType('CreateBlogInput')
export class CreateBlogInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  category_id: string;

  @Field({ nullable: true })
  @IsOptional()
  user_id: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  keywords: Array<string>;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  thumbnail: string;

  @Field({ nullable: true })
  @IsOptional()
  banner: string;

  @Field({ nullable: true })
  @IsOptional()
  status: string;
}

@InputType('UpdateBlogInput')
export class UpdateBlogInput extends PartialType(CreateBlogInput) {
  @Field()
  id: string;
}
