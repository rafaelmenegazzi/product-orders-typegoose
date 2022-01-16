import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { plainToClass } from 'class-transformer';
import { InjectModel } from 'nestjs-typegoose';

import { Product } from './models/product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { Order } from 'src/orders/models/order.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: ReturnModelType<typeof Product>,
  ) {}

  opts = { runValidators: true };

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return await createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().lean();
    return products.map((p) => plainToClass(Product, p));
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).lean();
    return plainToClass(Product, product);
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productModel
      .find({
        _id: { $in: ids },
      })
      .lean();
    return products.map((p) => plainToClass(Product, p));
  }

  async sell(productIds: string[], order: Order): Promise<Product[]> {
    const products = await this.findByIds(productIds);
    products.forEach((p) => p.sell(order));
    await Promise.all(
      products.map((p) =>
        this.productModel.findByIdAndUpdate(p._id, p, this.opts),
      ),
    );
    return products;
  }
}
