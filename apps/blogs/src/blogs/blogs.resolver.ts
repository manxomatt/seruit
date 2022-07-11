import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BaseResultType } from 'src/common/base-result.type';
import { BlogsService } from './blogs.service';
import { v4 as uuid } from 'uuid';
import {
  BlogResultType,
  BlogsResultType,
  CreateBlogInput,
  UpdateBlogInput,
} from './dto/blog.type';
import { BlogEntity } from './dto/blog.entity';
import { CategoriesService } from '../categories/categories.service';
import { BlogCommentsService } from '../comments/comments.service';

@Resolver()
export class BlogResolver {
  constructor(
    private blogsService: BlogsService,
    private categoriesService: CategoriesService,
    private commentsService: BlogCommentsService,
  ) {}

  @Query(() => BlogsResultType)
  async getBlogs() {
    const blogs = await this.blogsService.findAll();
    const categories = await this.categoriesService.listCategory();
    const mapCategories = new Map();
    categories.forEach((category) => {
      mapCategories.set(category.uuid, category);
    });

    const blogsCategory = blogs.map((blog) => {
      blog.category = mapCategories.get(blog.category_id);
      return blog;
    });

    return BaseResultType.successResult({
      result: blogsCategory,
      message: 'Blogs',
    });
  }

  @Query(() => BlogResultType)
  async getBlog(@Args('id') id: string) {
    const blog = await this.blogsService.findByUuid(id);
    if (!blog) {
      return BaseResultType.errorResult({
        result: null,
        message: 'Blog not found',
      });
    }

    const category = await this.categoriesService.findByUuid(blog.category_id);
    blog.category = category;

    const comments = await this.commentsService.listComment(blog.uuid);
    blog.comments = comments;

    return BaseResultType.successResult({
      result: blog,
      message: 'Blog Found',
    });
  }

  @Mutation(() => BlogResultType)
  async createBlog(@Args('CreateBlogInput') dto: CreateBlogInput) {
    const blogEntity = new BlogEntity(dto);

    if (dto.category_id) {
      const category = await this.categoriesService.findByUuid(dto.category_id);

      if (!category) {
        return BaseResultType.errorResult({
          result: null,
          message: 'Blog Category not found',
        });
      }
    }

    blogEntity.uuid = uuid();
    blogEntity.created_at = new Date();
    blogEntity.updated_at = new Date();
    blogEntity.deleted_at = null;

    const blogCreate = await this.blogsService.create(blogEntity);
    return BaseResultType.successResult({
      result: blogCreate,
      message: 'Blog Created',
    });
  }

  @Mutation(() => BlogResultType)
  async updateBlog(@Args('UpdateBlogInput') dto: UpdateBlogInput) {
    const blog = await this.blogsService.findByUuid(dto.id);
    if (!blog) {
      return BaseResultType.errorResult({
        result: blog,
        message: 'Blog Not Found',
      });
    }

    let category;
    if (dto.category_id) {
      category = await this.categoriesService.findByUuid(dto.category_id);

      if (!category) {
        return BaseResultType.errorResult({
          result: null,
          message: 'Blog Category not found',
        });
      }
    }

    blog.title = dto.title || blog.title;
    blog.category_id = dto.category_id || blog.category_id;
    blog.description = dto.description || blog.description;
    blog.keywords = dto.keywords || blog.keywords;
    blog.updated_at = new Date();

    const blogUpdate = await this.blogsService.update(blog);

    blogUpdate.category = category;
    return BaseResultType.successResult({
      result: blogUpdate,
      message: 'Blog  Updated',
    });
  }

  @Mutation(() => BlogResultType)
  async deleteBlog(@Args('id') id: string) {
    const blog = await this.blogsService.findByUuid(id);
    if (!blog) {
      return BaseResultType.errorResult({
        result: blog,
        message: 'Blog Not Found',
      });
    }

    blog.deleted_at = new Date();

    const blogDelete = await this.blogsService.update(blog);
    return BaseResultType.successResult({
      result: blogDelete,
      message: 'Blog Deleted',
    });
  }
}
