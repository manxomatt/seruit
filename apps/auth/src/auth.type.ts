import { BaseResponseDto } from 'src/common/base-response.dto';

class AuthToken {
  accessToken: string;
}

export class AuthType extends BaseResponseDto<AuthToken> {}
