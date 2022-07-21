import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { RmqService } from "./rmq.service";

interface IRmqModuleOptions {
  name: string;
}

@Module({
  providers: [RmqService],
  exports: [RmqService],
})
export class RmqModule {
  static register({ name }: IRmqModuleOptions) {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.registerAsync([{
          name,
          useFactory: (config: ConfigService) => ({
            transport: Transport.RMQ,
            options: {
              urls: [config.get<string>("RMQ_URI")],
              queue: config.get<string>(`RMQ_${name}_QUEUE`),
            },
          }),
          inject: [ConfigService],
        }])
      ],
      exports: [ClientsModule]
    };
  }
}

