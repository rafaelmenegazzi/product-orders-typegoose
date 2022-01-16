import { prop, Ref } from '@typegoose/typegoose';

import { BaseModel } from '../../database/base.model';
import { Product } from '../../products/models/product.model';

export class Order extends BaseModel {
  @prop({ ref: () => Product, type: () => String })
  products: Ref<Product, string>[] = [];

  @prop()
  customerName: string;

  addProducts(products: Product[]) {
    this.products = this.products.concat(products);
  }
}
