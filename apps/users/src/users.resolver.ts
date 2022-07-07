import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BasePaginationResultType } from 'src/common/base-pagination-result.type';
import { BaseResponseDto } from 'src/common/base-response.dto';
import { BaseResultType } from 'src/common/base-result.type';
import { ResponseCode, UserRole, UserStatus } from 'src/common/Constants';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import {
  UserResultType,
  UserType,
  UsersResultType,
  UserCreateInput,
  UserUpdateInput,
} from './user.type';
import { UsersService } from './users.service';

@Resolver(() => UserResultType)
export class UserResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => UserResultType)
  async getUser(@Args('id') id: string) {
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResultType.errorResult({
        result: user,
        message: 'User Not Found',
      });
    }
    return BaseResultType.successResult({
      result: user,
      message: 'User Found',
    });
  }

  @Query(() => UsersResultType)
  async getUsers() {
    const users = await this.usersService.listUser();
    return BasePaginationResultType.successResult({
      result: users,
      message: 'User List',
      metadata: '',
    });
  }

  @Mutation(() => UserResultType)
  async createUser(@Args('UserCreateInput') dto: UserCreateInput) {
    const user = await this.usersService.findByEmail(dto.email);

    if (user) {
      return BaseResultType.errorResult({
        result: null,
        message: 'User already exists',
      });
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    dto.first_name = dto.first_name || '';
    dto.last_name = dto.last_name || '';

    const userEntity = new UserEntity(dto);
    userEntity.uuid = uuid();
    userEntity.status = dto.status;
    userEntity.role = dto.role;
    userEntity.created_at = new Date();
    userEntity.updated_at = new Date();
    userEntity.deleted_at = null;
    const userCreate = await this.usersService.create(userEntity);
    return BaseResultType.successResult({
      result: userCreate,
      message: 'User Created',
    });
  }

  @Mutation(() => UserResultType)
  async updateUser(@Args('dto') dto: UserUpdateInput) {
    const user = await this.usersService.findByUuid(dto.id);
    if (!user) {
      return BaseResultType.errorResult({
        result: user,
        message: 'User Not Found',
      });
    }
    user.first_name = dto.first_name || user.first_name;
    user.last_name = dto.last_name || user.last_name;
    const userUpdate = await this.usersService.update(user);
    return BaseResultType.successResult({
      result: userUpdate,
      message: 'User Updated',
    });
  }

  @Mutation(() => UserResultType)
  async deleteUser(@Args('id') id: string) {
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResultType.errorResult({
        result: user,
        message: 'User Not Found',
      });
    }

    user.deleted_at = new Date();

    const userDelete = await this.usersService.update(user);
    return BaseResultType.successResult({
      result: userDelete,
      message: 'User Deleted',
    });
  }
}
