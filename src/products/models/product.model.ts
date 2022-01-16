import { prop } from '@typegoose/typegoose';

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

  public sell() {
    if (this.status !== 'IN_STOCK') {
      throw new Error('Product no longer available');
    }
    this.status = 'SOLD';
  }
}
