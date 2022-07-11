import { Field, Model } from 'fireo';
import { DeletedDate, NullField } from '../../../../../src/common/Fields';

export class BlogComment extends Model {
  uuid = Field.Text({ required: true });
  blog_id = Field.Text({ required: true });
  user_id = Field.Text({ required: true });
  parent_id = new NullField();
  comment = Field.Text({ required: true });
  likes = Field.Text({ required: false });

  created_at = Field.DateTime({ auto: false });
  updated_at = Field.DateTime({ auto: false });
  deleted_at = new DeletedDate();

  static config = {
    collectionName: 'Blog_comments',
  };
}
