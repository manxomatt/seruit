import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesResolver } from './categories.resolver';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesResolver],
})
export class CategoriesModule {}
