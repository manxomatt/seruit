import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UserEntity } from 'apps/users/src/user.entity';
import { lastValueFrom, map } from 'rxjs';
import { patterns } from '../../../src/common/patterns';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private userService: ClientProxy) {}

  async findUserByEmail(email: string): Promise<UserEntity> {
    const pattern = patterns.user.findUserByEmail;
    const user = await lastValueFrom(
      this.userService.send(pattern, { email }).pipe(map((res) => res)),
    ).catch(() => console.log('User Not Found'));

    return user;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
