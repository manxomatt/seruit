import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { BaseResponseDto } from '../../../src/common/base-response.dto';
import {
  ResponseCode,
  UserRole,
  UserStatus,
} from '../../../src/common/Constants';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UsersType, UserType } from './user.type';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from '../../../src/common/auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('user.getUserByEmail')
  async getUserByEmail(
    @Payload() payload: { email: string },
  ): Promise<UserEntity> {
    const user = await this.usersService.findByEmail(payload.email);
    return user;
  }

  // @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/users')
  async getAll(): Promise<UsersType> {
    const users = await this.usersService.listUser();

    return BaseResponseDto.successResponse(users, 'User List', ResponseCode.OK);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/users/me')
  async getMe(@Request() req): Promise<UserType> {
    const id = req.user.id;
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResponseDto.errorResponse(
        user,
        'User Not Found',
        ResponseCode.NOT_FOUND,
      );
    }
    return BaseResponseDto.successResponse(user, 'Profile', ResponseCode.OK);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @MessagePattern('user.getUserById')
  @Get('/users/:id')
  async get(@Param('id') id: string): Promise<UserType> {
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResponseDto.errorResponse(
        user,
        'User Not Found',
        ResponseCode.NOT_FOUND,
      );
    }
    return BaseResponseDto.successResponse(user, 'User Found', ResponseCode.OK);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/users')
  async create(@Body() dto: CreateUserDto): Promise<UserType> {
    const user = await this.usersService.findByEmail(dto.email);

    if (user) {
      return BaseResponseDto.errorResponse(
        null,
        'User already exists',
        ResponseCode.OK,
      );
    }
    dto.password = await bcrypt.hash(dto.password, 10);
    dto.first_name = dto.first_name || '';
    dto.last_name = dto.last_name || '';

    const userEntity = new UserEntity(dto);
    userEntity.uuid = uuid();
    userEntity.status = UserStatus.ACTIVE;
    userEntity.role = UserRole.ADMIN;
    userEntity.created_at = new Date();
    userEntity.updated_at = new Date();
    userEntity.deleted_at = null;
    const userCreate = await this.usersService.create(userEntity);
    return BaseResponseDto.successResponse(
      userCreate,
      'User Created',
      ResponseCode.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/users/:id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserType> {
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResponseDto.errorResponse(
        id,
        'User Not Found',
        ResponseCode.NOT_FOUND,
      );
    }
    user.first_name = dto.first_name || user.first_name;
    user.last_name = dto.last_name || user.last_name;
    const userUpdate = await this.usersService.update(user);
    return BaseResponseDto.successResponse(
      userUpdate,
      'User Updated',
      ResponseCode.OK,
    );
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/users/:id')
  async delete(@Param('id') id: string): Promise<UserType> {
    const user = await this.usersService.findByUuid(id);
    if (!user) {
      return BaseResponseDto.errorResponse(
        id,
        'User Not Found',
        ResponseCode.NOT_FOUND,
      );
    }

    user.deleted_at = new Date();
    const updateUser = await this.usersService.update(user);
    return BaseResponseDto.successResponse(updateUser, 'User Deleted');
  }
}
