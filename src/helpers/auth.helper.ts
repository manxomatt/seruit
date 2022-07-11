import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'apps/users/src/user.entity';
import * as bcrypt from 'bcrypt';
import { User } from 'apps/users/src/user.model';
import { ClientProxy } from '@nestjs/microservices';
import { patterns } from '../common/patterns';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthHelper {
  //   @InjectRepository(User)
  //   private readonly repository: Repository<User>;

  private readonly jwt: JwtService;

  constructor(
    jwt: JwtService,
    @Inject('USER_SERVICE') private userService: ClientProxy,
    private configService: ConfigService,
  ) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  // Get User by User ID we get from decode()
  public async validateUser(decoded: any): Promise<any> {
    const pattern = patterns.user.findUserById;
    return this.userService.send(pattern, decoded.id);
  }

  // Generate JWT Token
  public generateToken(user: UserEntity): string {
    return this.jwt.sign(
      { id: user.uuid, email: user.email },
      {
        secret: this.configService.get('JWT_KEY'),
        expiresIn: '1h',
        // algorithm: 'RS256',
      },
    );
  }

  // Validate User's password
  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  // Encode User's password
  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    const decoded: unknown = this.jwt.verify(token);

    if (!decoded) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user: User = await this.validateUser(decoded);

    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
