import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogCommentsService } from './comments.service';
import { BlogCommentEntity } from './dto/comment.entity';
import { v4 as uuid } from 'uuid';

import {
  BlogCommentResultType,
  BlogCommentsResultType,
  CreateBlogCommentInput,
  UpdateBlogCommentInput,
} from './dto/comment.type';
import { BaseResultType } from 'src/common/base-result.type';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';

@Resolver()
export class BlogCommentsResolver {
  constructor(private blogCommentService: BlogCommentsService) {}

  @Mutation(() => BlogCommentResultType)
  async createBlogComment(
    @Args('CreateBlogCommentInput') dto: CreateBlogCommentInput,
  ) {
    const blogCommentEntity = new BlogCommentEntity(dto);

    if (!dto.parent_id) {
      blogCommentEntity.parent_id = null;
    }
    blogCommentEntity.uuid = uuid();
    blogCommentEntity.created_at = new Date();
    blogCommentEntity.updated_at = new Date();
    blogCommentEntity.deleted_at = null;

    const blogCommentCreate = await this.blogCommentService.create(
      blogCommentEntity,
    );

    return BaseResultType.successResult({
      result: blogCommentCreate,
      message: 'Blog Comment Created',
    });
  }

  @Mutation(() => BlogCommentResultType)
  async updateBlogComment(
    @Args('UpdateBlogCommentInput') dto: UpdateBlogCommentInput,
  ) {
    const blogCommentEntity = await this.blogCommentService.findByUuid(dto.id);
    if (!blogCommentEntity) {
      return BaseResultType.errorResult({
        result: blogCommentEntity,
        message: 'Blog Comment Not Found',
      });
    }

    blogCommentEntity.comment = dto.comment;
    blogCommentEntity.updated_at = new Date();

    const blogCommentUpdate = await this.blogCommentService.update(
      blogCommentEntity,
    );

    return BaseResultType.successResult({
      result: blogCommentUpdate,
      message: 'Blog Comment Updated',
    });
  }

  @Mutation(() => BlogCommentResultType)
  async deleteBlogComment(@Args('id') id: string) {
    const blogCommentEntity = await this.blogCommentService.findByUuid(id);
    if (!blogCommentEntity) {
      return BaseResultType.errorResult({
        result: blogCommentEntity,
        message: 'Blog Comment Not Found',
      });
    }
    blogCommentEntity.deleted_at = new Date();
    const blogCommentDelete = await this.blogCommentService.update(
      blogCommentEntity,
    );

    return BaseResultType.successResult({
      result: blogCommentDelete,
      message: 'Blog Comment Deleted',
    });
  }

  @Query(() => BlogCommentsResultType)
  async getBlogComments(@Args('id') id: string) {
    const comments = await this.blogCommentService.listComment(id);
    return BasePaginationResultType.successResult({
      result: comments,
      message: 'Blog Comments',
      metadata: '',
    });
  }

  @Query(() => BlogCommentResultType)
  async getBlogComment(@Args('id') id: string) {
    const comment = await this.blogCommentService.findByUuid(id);
    if (!comment) {
      return BaseResultType.errorResult({
        result: comment,
        message: 'Blog Comment Not Found',
      });
    }
    return BaseResultType.successResult({
      result: comment,
      message: 'Blog Comment',
    });
  }
}
