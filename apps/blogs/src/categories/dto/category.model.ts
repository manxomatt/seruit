import { Field, Model } from 'fireo';
import { DeletedDate } from '../../../../../src/common/Fields';

export class BlogCategory extends Model {
  uuid = Field.Text({ required: true });
  title = Field.Text({ required: true });
  sub_title = Field.Text({ required: true });
  slug = Field.Text({ required: true });

  created_at = Field.DateTime({ auto: false });
  updated_at = Field.DateTime({ auto: false });
  deleted_at = new DeletedDate();

  static config = {
    collectionName: 'Blog_categories',
  };
}
