import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost:27017/costumer-orders'),
  ],
  controllers: [],
  providers: [],
})
export class DataBaseModule {}
