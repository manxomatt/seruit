import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../categories/categories.service';
import { BlogEntity } from './dto/blog.entity';
import { Blog } from './dto/blog.model';

@Injectable()
export class BlogsService {
  async create(blogEntity: BlogEntity): Promise<BlogEntity> {
    const blog = Blog.fromObject(blogEntity);
    await blog.save();
    return new BlogEntity(blog.toObject());
  }

  async findAll(): Promise<BlogEntity[]> {
    const blogs = await Blog.collection.where('deleted_at', '==', null).fetch();

    const blogsEntity: BlogEntity[] = [];
    blogs.list.forEach((blog) => {
      const objBlog = blog.toObject();
      objBlog.created_at = new Date(objBlog.created_at._seconds * 1000);
      objBlog.updated_at = new Date(objBlog.updated_at._seconds * 1000);
      const blogEntity = new BlogEntity(objBlog);

      blogsEntity.push(blogEntity);
    });

    return blogsEntity;
  }

  async findByUuid(id: string): Promise<BlogEntity> {
    const blog = await Blog.collection
      .where('deleted_at', '==', null)
      .where('uuid', '==', id)
      .get();
    if (blog) {
      const objBlog = blog.toObject();
      objBlog.created_at = new Date(objBlog.created_at._seconds * 1000);
      objBlog.updated_at = new Date(objBlog.updated_at._seconds * 1000);
      const blogEntity = new BlogEntity(objBlog);
      return blogEntity;
    }

    return null;
  }

  async update(blogEntity: BlogEntity): Promise<BlogEntity> {
    const category = Blog.fromObject(blogEntity);
    await category.update({ id: blogEntity['id'] });
    return new BlogEntity(category.toObject());
  }
}
