import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { BlogCategoryEntity } from './dto/category.entity';
import {
  CategoriesResultType,
  CategoryResultType,
  CreateBlogCategoryInput,
  UpdateBlogCategoryInput,
} from './dto/category.type';
import { v4 as uuid } from 'uuid';
import { BaseResultType } from 'src/common/base-result.type';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';

@Resolver(() => CategoryResultType)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}

  @Query(() => CategoryResultType)
  async getCategory(@Args('id') id: string) {
    const category = await this.categoriesService.findByUuid(id);
    if (!category) {
      return BaseResultType.errorResult({
        result: category,
        message: 'Blog Category Not Found',
      });
    }
    return BaseResultType.successResult({
      result: category,
      message: 'Category',
    });
  }

  @Query(() => CategoriesResultType)
  async getCategories() {
    const categories = await this.categoriesService.listCategory();
    return BasePaginationResultType.successResult({
      result: categories,
      message: 'Blog Categories',
      metadata: '',
    });
  }

  @Mutation(() => CategoryResultType)
  async createBlogCategory(
    @Args('CreateBlogCategoryInput') dto: CreateBlogCategoryInput,
  ) {
    const categoryEntity = new BlogCategoryEntity(dto);
    categoryEntity.uuid = uuid();
    categoryEntity.created_at = new Date();
    categoryEntity.updated_at = new Date();
    categoryEntity.deleted_at = null;
    const categoryCreate = await this.categoriesService.create(categoryEntity);
    return BaseResultType.successResult({
      result: categoryCreate,
      message: 'Category Created',
    });
  }

  @Mutation(() => CategoryResultType)
  async updateBlogCategory(
    @Args('UpdateBlogCategoryInput') dto: UpdateBlogCategoryInput,
  ) {
    const category = await this.categoriesService.findByUuid(dto.id);
    if (!category) {
      return BaseResultType.errorResult({
        result: category,
        message: 'Blog Category Not Found',
      });
    }

    category.title = dto.title || category.title;
    category.sub_title = dto.sub_title || category.sub_title;
    category.sub_title = dto.slug || category.slug;
    category.updated_at = new Date();

    const categotyUpdate = await this.categoriesService.update(category);
    return BaseResultType.successResult({
      result: categotyUpdate,
      message: 'Blog Category Updated',
    });
  }

  @Mutation(() => CategoryResultType)
  async deleteBlogCategory(@Args('id') id: string) {
    const category = await this.categoriesService.findByUuid(id);
    if (!category) {
      return BaseResultType.errorResult({
        result: category,
        message: 'Blog Category Not Found',
      });
    }

    category.deleted_at = new Date();

    const categoryDelete = await this.categoriesService.update(category);
    return BaseResultType.successResult({
      result: categoryDelete,
      message: 'Blog Category Deleted',
    });
  }
}
