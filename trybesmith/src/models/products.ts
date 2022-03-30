import { Pool, RowDataPacket, ResultSetHeader } from 'mysql2/promise';
import { Product, ProductWithId, ProductWithOrderId } from '../interfaces/products';
import { GET_ALL_PRODUCTS, CREATE_PRODUCT } from '../helpers/queries';

export default class ProductsModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<ProductWithOrderId[]> {
    const [result] = await this.connection.execute<RowDataPacket[]>(
      GET_ALL_PRODUCTS,
    );
    return result as ProductWithOrderId[];
  }

  public async create(product: Product): Promise<ProductWithId> {
    const { name, amount } = product;
    const [result] = await this.connection.execute<ResultSetHeader>(
      CREATE_PRODUCT,
      [name, amount],
    );
    const { insertId } = result;
    return { id: insertId, name, amount };
  }
}
