import { Field, InputType, Int, ObjectType, OmitType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';
import { BaseResponseDto } from 'src/common/base-response.dto';
import { BaseResultType } from 'src/common/base-result.type';
import { UserRole, UserStatus } from 'src/common/Constants';
import { UserEntity } from './user.entity';

@ObjectType()
export class UserResultType extends BaseResultType<UserEntity | string> {
  @Field(() => UserEntity, { nullable: true })
  result?: UserEntity;
}

@ObjectType()
export class UsersResultType extends BasePaginationResultType<UserEntity[]> {
  @Field(() => [UserEntity], { nullable: true })
  result?: UserEntity[];
}

@InputType('UserCreateInput')
export class UserCreateInput {
  @Field({ nullable: true })
  @IsOptional()
  first_name?: string;

  @Field({ nullable: true })
  @IsOptional()
  last_name?: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @Field(() => UserRole)
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @Field(() => UserStatus)
  @IsNotEmpty()
  @IsEnum(UserStatus)
  status?: UserStatus;
}

@InputType('UserUpdateInput')
export class UserUpdateInput extends OmitType(UserCreateInput, [
  'email',
  'password',
  'role',
  'status',
] as const) {
  @Field()
  id: string;
}

export class UserType extends BaseResponseDto<UserEntity | string> {}

export class UsersType extends BaseResponseDto<UserEntity[]> {}
