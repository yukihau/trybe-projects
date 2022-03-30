import ProductsModel from '../models/products';
import connection from '../models/connection';
import { Product, ProductWithId, ProductWithOrderId, Service } from '../interfaces/products';

export default class ProductsService {
  model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public async getAll(): Promise<Service> {
    const result: ProductWithOrderId[] = await this.model.getAll();
    return { code: 200, data: result };
  }

  public async create(product: Product): Promise<Service> {
    const result: ProductWithId = await this.model.create(product);
    return { code: 201, data: { item: result } };
  }
}
