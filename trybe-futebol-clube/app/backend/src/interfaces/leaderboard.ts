import Match from '../database/models/Match';

export interface ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export type LeaderboardParams = keyof ILeaderboard;

export type GoalType = 'favor' | 'own';

export type Route = 'home' | 'away' | 'all';

export type TeamArea = keyof Match;
