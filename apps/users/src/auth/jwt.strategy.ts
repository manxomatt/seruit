import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthHelper } from 'src/helpers/auth.helper';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_KEY') || 'dev',
      ignoreExpiration: true,
    });
  }

  validate(payload: any): any {
    // console.log(payload);
    const user = this.userService.findByUuid(payload.id);
    if (!user) {
      throw new UnauthorizedException('Unauthorized User.');
    }

    return payload;
  }
}
