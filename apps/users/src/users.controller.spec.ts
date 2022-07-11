import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return an Array Of users', async () => {
      const result = ['test'];

      expect(await usersController.getAll()).toBe(result);
      // expect(usersController.getHello()).toBe('Hello World!');
    });
  });
});
