import { IsEmail, IsString } from 'class-validator';
import { Trim } from 'class-sanitizer';

export class authDto {
  @Trim()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
