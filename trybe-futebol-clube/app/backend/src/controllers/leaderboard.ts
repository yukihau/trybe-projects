import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard';

export default class LeaderboardController {
  constructor(private service = new LeaderboardService()) { }

  public getHomeLeaderboard = async (req: Request, res: Response) => {
    const { code, data } = await this.service.getLeaderboard('home');
    return res.status(code).json(data);
  };

  public getAwayLeaderboard = async (req: Request, res: Response) => {
    const { code, data } = await this.service.getLeaderboard('away');
    return res.status(code).json(data);
  };

  public getAllLeaderboard = async (req: Request, res: Response) => {
    const { code, data } = await this.service.getLeaderboard('all');
    return res.status(code).json(data);
  };
}
