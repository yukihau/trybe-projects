import { Request, Response } from 'express';
import MatchService from '../services/match';

export default class MatchController {
  constructor(private service = new MatchService()) { }

  public getAll = async (req: Request, res: Response) => {
    const inProgress = req.query.inProgress as string || false;

    const { code, data } = await this.service.getAll(inProgress);

    return res.status(code).json(data);
  };

  public create = async (req: Request, res: Response) => {
    const match = req.body;

    const { code, data } = await this.service.create(match);

    return res.status(code).json(data);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const valuesToUpdate = req.body;

    const { code, data } = await this.service.updateMatch(id, valuesToUpdate);

    return res.status(code).json(data);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const { code, data } = await this.service.finishMatch(id);

    return res.status(code).json(data);
  };
}
