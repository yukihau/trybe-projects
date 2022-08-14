import { Request, Response } from 'express';
import UserService from '../services/user';

export default class UserController {
  constructor(private service = new UserService()) { }

  public login = async (req: Request, res: Response) => {
    const { code, data } = await this.service.login(req.body);
    return res.status(code).json(data);
  };

  public validate = async (req: Request, res: Response) => {
    const token = req.headers.authorization as string;
    const { code, data } = await this.service.validate(token);
    return res.status(code).json(data);
  };
}
