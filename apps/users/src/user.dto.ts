import { OmitType } from '@nestjs/mapped-types';

export class CreateUserDto {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
}

export class UpdateUserDto extends OmitType(CreateUserDto, [
  'email',
  'password',
] as const) {}
