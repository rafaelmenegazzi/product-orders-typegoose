import { prop, Ref } from '@typegoose/typegoose';
import { Order } from 'src/orders/models/order.model';

import { BaseModel } from '../../database/base.model';

export class Product extends BaseModel {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  price: number;

  @prop({ required: true })
  sku: number;

  @prop({ enum: ['IN_STOCK', 'SOLD'], default: 'IN_STOCK' })
  status: string;

  @prop({ ref: () => Order, type: () => String })
  order: Ref<Order, string>;

  public sell(order: Order) {
    if (this.status !== 'IN_STOCK') {
      throw new Error('Product no longer available');
    }
    this.status = 'SOLD';
    this.order = order;
  }
}
