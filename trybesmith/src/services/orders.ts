import OrdersModel from '../models/orders';
import connection from '../models/connection';
import { OrderWithProducts, Service } from '../interfaces/orders';

export default class OrdersService {
  model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll(): Promise<Service> {
    const result: OrderWithProducts[] = await this.model.getAll();
    return { code: 200, data: result };
  }
}
