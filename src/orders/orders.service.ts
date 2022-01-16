import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { plainToClass } from 'class-transformer';
import { InjectModel } from 'nestjs-typegoose';

import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly orderModel: ReturnModelType<typeof Order>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const createdOrder = new this.orderModel({
      customerName: createOrderDto.customerName,
    });
    const products = await this.productsService.sell(
      createOrderDto.productIds,
      createdOrder,
    );
    createdOrder.addProducts(products);
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders.map((o) => plainToClass(Order, o.toJSON()));
  }
}
