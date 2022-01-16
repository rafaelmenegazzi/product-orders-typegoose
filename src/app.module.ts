import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] }), DataBaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
