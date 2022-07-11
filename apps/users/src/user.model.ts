import { Field, Model } from 'fireo';
import { DeletedDate } from '../../../src/common/Fields';

export class User extends Model {
  uuid = Field.Text({ required: true });
  first_name = Field.Text({ required: true });
  last_name = Field.Text({ required: true });
  email = Field.Text({ required: true });
  password = Field.Text({ required: true });
  role = Field.Text({ required: true });
  status = Field.Text({ required: true });

  created_at = Field.DateTime({ auto: false });
  updated_at = Field.DateTime({ auto: false });
  deleted_at = new DeletedDate();

  static config = {
    collectionName: 'Users',
  };
}
