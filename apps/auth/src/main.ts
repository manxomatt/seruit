import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('AUTH_API_PORT');
  await app.listen(port, () => {
    logger.log(`Running on port: ${port}`);
  });
}
bootstrap();
