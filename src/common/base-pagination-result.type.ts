import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

type PayloadType<T> = {
  result: T;
  metadata: any;
  message: string;
};

@ObjectType()
export class PaginationMetadataType {
  @Field(() => Int)
  totalDocs: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  pagingCounter: number;

  @Field(() => Boolean)
  hasPrevPage: boolean;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Int, { nullable: true })
  prevPage: number;

  @Field(() => Int, { nullable: true })
  nextPage: number;
}

@ObjectType()
export class BasePaginationResultType<T> {
  @Field(() => GraphQLJSONObject, { nullable: true })
  result?: T;

  @Field()
  message: string;

  @Field(() => PaginationMetadataType)
  metadata: PaginationMetadataType;

  @Field(() => Boolean)
  success = true;

  constructor(partial: Partial<BasePaginationResultType<T>>) {
    Object.assign(this, partial);
  }

  static successResult<T>(
    payload: PayloadType<T>,
  ): BasePaginationResultType<T> {
    const { result, metadata, message } = payload;

    return new BasePaginationResultType({
      result,
      metadata,
      message,
      success: true,
    });
  }

  static errorResult<T>(payload: PayloadType<T>): BasePaginationResultType<T> {
    const { result, metadata, message } = payload;

    return new BasePaginationResultType({
      result,
      metadata,
      message,
      success: false,
    });
  }
}
