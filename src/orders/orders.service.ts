import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { plainToClass } from 'class-transformer';
import { InjectModel } from 'nestjs-typegoose';

import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: ReturnModelType<typeof Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      customerName: createOrderDto.customerName,
    });
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().lean();
    return orders.map((o) => plainToClass(Order, o));
  }
}
