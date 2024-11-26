import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(envs.port);
  logger.log(`App running on port ${envs.port}`);

  // const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe());
  // await app.listen(process.env.PORT ?? 3002);
}
bootstrap();
