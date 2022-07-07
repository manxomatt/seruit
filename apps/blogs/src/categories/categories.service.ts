import { Injectable } from '@nestjs/common';
import { BlogCategoryEntity } from './dto/category.entity';
import { BlogCategory } from './dto/category.model';
import { CategoriesResultType } from './dto/category.type';

@Injectable()
export class CategoriesService {
  async create(
    blogCategotyEntity: BlogCategoryEntity,
  ): Promise<BlogCategoryEntity> {
    const category = BlogCategory.fromObject(blogCategotyEntity);
    await category.save();
    return new BlogCategoryEntity(category.toObject());
  }

  async update(
    blogCategotyEntity: BlogCategoryEntity,
  ): Promise<BlogCategoryEntity> {
    const category = BlogCategory.fromObject(blogCategotyEntity);
    await category.update({ id: blogCategotyEntity['id'] });
    return new BlogCategoryEntity(category.toObject());
  }

  async findByUuid(uuid: string): Promise<BlogCategoryEntity> {
    const category = await BlogCategory.collection
      .where('deleted_at', '==', null)
      .where('uuid', '==', uuid)
      .get();

    if (category) {
      const objCategory = category.toObject();
      objCategory.created_at = new Date(objCategory.created_at._seconds * 1000);
      objCategory.updated_at = new Date(objCategory.updated_at._seconds * 1000);
      const categoryEntity = new BlogCategoryEntity(objCategory);
      return categoryEntity;
    }

    return null;
  }

  async listCategory(): Promise<BlogCategoryEntity[]> {
    const categories = await BlogCategory.collection
      .where('deleted_at', '==', null)
      .fetch();

    const categoriesEntity: BlogCategoryEntity[] = [];
    categories.list.forEach((category) => {
      const objCategory = category.toObject();
      objCategory.created_at = new Date(objCategory.created_at._seconds * 1000);
      objCategory.updated_at = new Date(objCategory.updated_at._seconds * 1000);
      const categoryEntity = new BlogCategoryEntity(objCategory);

      categoriesEntity.push(categoryEntity);
    });

    return categoriesEntity;
  }
}
