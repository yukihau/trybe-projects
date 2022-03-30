import { Pool, RowDataPacket } from 'mysql2/promise';
import { Order, OrderWithProducts } from '../interfaces/orders';
import { GET_ALL_ORDERS_WITH_PRODUCTS } from '../helpers/queries';
import productOrderJunction from '../helpers/productOrderJunction';

export default class OrdersModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<OrderWithProducts[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      GET_ALL_ORDERS_WITH_PRODUCTS,
    );
    const orderWithProducts = productOrderJunction(result as Order[]);
    console.log(orderWithProducts);
    return orderWithProducts;
  }
}
