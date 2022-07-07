import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module';
// import { UserListController } from 'users/src/modules/userList/UserList.controller';
// import { UserService } from 'users/src/services/user.service';

@Module({
  // imports: [], //UsersModuleAuthModule
  controllers: [AppController], // UserListController],
  providers: [AppService], // UserService],
})
export class AppModule {}
