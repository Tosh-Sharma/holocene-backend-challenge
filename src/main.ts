import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';

import { AppModule } from './app.module';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Load Plan API')
    .setDescription('The CRUD API for Load Plan tranasctions')
    .setVersion('0.1')
    .build();

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
