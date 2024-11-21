import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  await app.listen(envs.port || 3000);
  logger.log(`App running on port ${envs.port || '3MIL'}`);
}
bootstrap();
