import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({

      useFactory: (configService: ConfigService) => {
        console.log(configService.get('MONGODB_URI'), "xxxxxxxxxxxxxxxxxxxx");
        return {
          uri: configService.get<string>('MONGODB_URI'),
        }
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
