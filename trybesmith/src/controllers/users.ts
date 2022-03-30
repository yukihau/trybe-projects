import { Request, Response } from 'express';
import UsersService from '../services/users';
import generateToken from '../helpers/generateToken';
import { UserWithId } from '../interfaces/users';

export default class ProductsController {
  constructor(private service = new UsersService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const { code, data } = await this.service.create(user);
    const token = generateToken(data as UserWithId);
    return res.status(code).json({ token });
  };
}
