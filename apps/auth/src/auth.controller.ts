import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { BaseResponseDto } from '../../../src/common/base-response.dto';
import { ResponseCode } from '../../../src/common/Constants';
import { AuthHelper } from '../../../src/helpers/auth.helper';
import { authDto } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthType } from './auth.type';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authHelper: AuthHelper,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @Post('/auth')
  async auth(@Body() dto: authDto): Promise<AuthType> {
    const user = await this.authService.findUserByEmail(dto.email);

    if (user) {
      if (user.deleted_at == null) {
        const isPasswordValid: boolean = this.authHelper.isPasswordValid(
          dto.password,
          user.password,
        );
        if (!isPasswordValid) {
          throw new HttpException('No user found', HttpStatus.NOT_FOUND);
        }
        const accessToken = this.authHelper.generateToken(user);
        return BaseResponseDto.successResponse(
          {
            accessToken,
          },
          'Login sucess',
          ResponseCode.OK,
        );
      }
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    throw new HttpException('No user found', HttpStatus.NOT_FOUND);
  }
}
