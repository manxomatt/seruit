import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Fireo } from 'fireo';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users.controller';
import { UserResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserResolver],
})
export class UsersModule {}
