import { Request, Response } from 'express';
import TeamService from '../services/team';

export default class TeamController {
  constructor(private service = new TeamService()) { }

  public getAll = async (req: Request, res: Response) => {
    const { code, data } = await this.service.getAll();
    return res.status(code).json(data);
  };

  public getById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { code, data } = await this.service.getById(id);
    return res.status(code).json(data);
  };
}
