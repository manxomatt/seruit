import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

type PayloadType<T> = {
  result: T;
  message: string;
};

@ObjectType()
export class BaseResultType<T> {
  @Field(() => GraphQLJSONObject, { nullable: true })
  result?: T;

  @Field()
  message: string;

  @Field(() => Boolean)
  success = true;

  constructor(partial: Partial<BaseResultType<T>>) {
    Object.assign(this, partial);
  }

  static successResult<T>(payload: PayloadType<T>): BaseResultType<T> {
    const { result, message } = payload;

    return new BaseResultType({
      result,
      message,
      success: true,
    });
  }

  static errorResult<T>(payload: PayloadType<T>): BaseResultType<T> {
    const { result, message } = payload;

    return new BaseResultType({
      result,
      message,
      success: false,
    });
  }
}
