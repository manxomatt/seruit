import { Field, Model } from 'fireo';
import { DeletedDate } from 'src/common/Fields';

export class Blog extends Model {
  uuid = Field.Text({ required: true });
  category_id = Field.Text({ required: true });
  user_id = Field.Text({ required: true });
  title = Field.Text({ required: true });
  keywords = Field.List();
  description = Field.Text({ required: true });
  thumbnail = Field.Text({ required: true });
  banner = Field.Text({ required: true });
  status = Field.Text({ required: true });

  created_at = Field.DateTime({ auto: false });
  updated_at = Field.DateTime({ auto: false });
  deleted_at = new DeletedDate();

  static config = {
    collectionName: 'Blogs',
  };
}
