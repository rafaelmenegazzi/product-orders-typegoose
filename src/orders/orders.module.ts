import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';

import { ProductsModule } from '../products/products.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './models/order.model';

@Module({
  imports: [TypegooseModule.forFeature([Order]), ProductsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
