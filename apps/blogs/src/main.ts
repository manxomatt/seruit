import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Fireo } from 'fireo';
import { BlogsModule } from './blogs/blogs.module';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(BlogsModule);
  const configService = app.get(ConfigService);

  Fireo.connection.setting({ keyFilename: 'firebase.json' });
  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get<number>('BLOG_API_PORT');
  await app.listen(port, () => {
    logger.log(`Running on port: ${port}`);
  });
}
bootstrap();
