import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);

  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  const port = config.get('PORT') || 3000;

  await app.listen(port);
}
bootstrap();
