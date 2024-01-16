import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
