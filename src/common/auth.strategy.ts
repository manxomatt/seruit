import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from 'apps/users/src/user.entity';
import { AuthHelper } from 'src/helpers/auth.helper';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  //   @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dev', //config.get('JWT_KEY'),
      ignoreExpiration: true,
    });
  }

  private validate(payload: string): Promise<UserEntity | never> {
    return this.helper.validateUser(payload);
  }
}
