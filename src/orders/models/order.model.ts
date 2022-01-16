import { prop, Ref } from '@typegoose/typegoose';

import { BaseModel } from '../../database/base.model';
import { useMongoosePlugin } from '../../decorators/use-mongoose-plugins.decorator';
import { Product } from '../../products/models/product.model';

@useMongoosePlugin()
export class Order extends BaseModel {
  @prop({
    ref: () => Product,
    type: () => String,
    autopopulate: { maxDepth: 1 },
  })
  products: Ref<Product, string>[] = [];

  @prop()
  customerName: string;

  addProducts(products: Product[]) {
    this.products = this.products.concat(products);
  }
}
