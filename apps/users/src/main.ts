import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Fireo } from 'fireo';
import { UsersModule } from './users.module';

async function bootstrap() {
  const logger = new Logger('Server');
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);

  Fireo.connection.setting({ keyFilename: 'firebase.json' });
  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        port: configService.get<number>('USER_SERVICE_PORT'),
      },
    },
    { inheritAppConfig: true },
  );

  await app.startAllMicroservices();

  const port = configService.get<number>('USER_API_PORT');
  await app.listen(port, () => {
    logger.log(`Running on port: ${port}`);
  });
}
bootstrap();
