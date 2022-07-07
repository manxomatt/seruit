import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port, () => {
    logger.log(`Running on port: ${port}`);
  });
}
bootstrap();
