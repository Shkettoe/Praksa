import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import  * as cookieParser from 'cookie-parser'
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  app.enableCors({origin: 'http://localhost:3000'})
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(5000);
}
bootstrap();
