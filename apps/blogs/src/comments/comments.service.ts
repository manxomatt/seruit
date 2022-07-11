import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './dto/comment.entity';
import { BlogComment } from './dto/comment.model';

@Injectable()
export class BlogCommentsService {
  async create(
    blogCommentEntity: BlogCommentEntity,
  ): Promise<BlogCommentEntity> {
    const comment = BlogComment.fromObject(blogCommentEntity);
    await comment.save();
    return new BlogCommentEntity(comment.toObject());
  }

  async listComment(blog_id: string): Promise<BlogCommentEntity[]> {
    const comments = await BlogComment.collection
      .where('deleted_at', '==', null)
      .where('blog_id', '==', blog_id)
      .fetch();

    const commentsEntity: BlogCommentEntity[] = [];
    comments.list.forEach((comment) => {
      const objComment = comment.toObject();
      objComment.created_at = new Date(objComment.created_at._seconds * 1000);
      objComment.updated_at = new Date(objComment.updated_at._seconds * 1000);
      const commentEntity = new BlogCommentEntity(objComment);

      commentsEntity.push(commentEntity);
    });

    return commentsEntity;
  }

  async findByUuid(uuid: string): Promise<BlogCommentEntity> {
    const comment = await BlogComment.collection
      .where('deleted_at', '==', null)
      .where('uuid', '==', uuid)
      .get();

    if (comment) {
      const objComment = comment.toObject();
      objComment.created_at = new Date(objComment.created_at._seconds * 1000);
      objComment.updated_at = new Date(objComment.updated_at._seconds * 1000);
      const commentEntity = new BlogCommentEntity(objComment);
      return commentEntity;
    }

    return null;
  }

  async update(
    blogCommentEntity: BlogCommentEntity,
  ): Promise<BlogCommentEntity> {
    const comment = BlogComment.fromObject(blogCommentEntity);
    await comment.update({ id: blogCommentEntity['id'] });
    return new BlogCommentEntity(comment.toObject());
  }
}
