import { Request, Response } from 'express';
import OrdersService from '../services/orders';

export default class OrdersController {
  constructor(private service = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const { code, data } = await this.service.getAll();
    return res.status(code).json(data);
  };
}
