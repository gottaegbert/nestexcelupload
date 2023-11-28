// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for all origins
  await app.listen(3000);
  Logger.log(`Server running on http://localhost:3000`, 'Bootstrap');
}
bootstrap();
