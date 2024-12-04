import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // Aplicar el ValidationPipe globalmente para validar y transformar automáticamente los DTOs
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true, // Asegura que las transformaciones de los DTOs se apliquen
  //     whitelist: true, // Elimina propiedades no permitidas en los DTOs
  //   }),
  // );

  await app.listen(process.env.PORT ?? 3003);
}
bootstrap();
