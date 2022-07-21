import { RmqService } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);

  const rmqService = app.get<RmqService>(RmqService);


  console.log('Booting up billing service');

  app.connectMicroservice(rmqService.getOptions('BILLING'));

  await app.startAllMicroservices();

}
bootstrap();
