import { ResponseCode } from './Constants';

export class BaseResponseDto<T> {
  data: T | string;
  message: string;
  success: boolean;
  responseCode?: ResponseCode;

  constructor(partial: Partial<BaseResponseDto<T>>) {
    Object.assign(this, partial);
  }

  static successResponse<T>(
    data: T,
    message: string,
    responseCode: ResponseCode | null = null,
  ): BaseResponseDto<T> {
    return new BaseResponseDto({
      data,
      message,
      responseCode,
      success: true,
    });
  }

  static errorResponse<T>(
    data: T | string,
    message: string,
    responseCode: ResponseCode | null = null,
  ): BaseResponseDto<T> {
    return new BaseResponseDto({
      data,
      message,
      responseCode,
      success: false,
    });
  }
}
