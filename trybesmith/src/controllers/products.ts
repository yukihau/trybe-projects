import { Request, Response } from 'express';
import ProductsService from '../services/products';

export default class ProductsController {
  constructor(private service = new ProductsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const { code, data } = await this.service.getAll();
    return res.status(code).json(data);
  };

  public create = async (req: Request, res: Response) => {
    const product = req.body;
    const { code, data } = await this.service.create(product);
    return res.status(code).json(data);
  };
}
