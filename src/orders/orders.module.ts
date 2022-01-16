import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';

@Module({
  imports: [TypegooseModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
