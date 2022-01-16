import { prop } from '@typegoose/typegoose';

import { BaseModel } from '../../database/base.model';

export class Order extends BaseModel {
  @prop()
  customerName: string;
}
