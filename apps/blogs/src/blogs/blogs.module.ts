import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { CategoriesModule } from '../categories/categories.module';
import { BlogResolver } from './blogs.resolver';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    CategoriesModule,
  ],
  controllers: [BlogsController],
  providers: [BlogsService, CategoriesService, BlogResolver],
})
export class BlogsModule {}
