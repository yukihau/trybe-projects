export type IMappedMatchObject = {
  [key: string]: number | string | boolean;
};

export interface IMatch {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamAway?: {
    id?: number,
    teamName: string,
  }
}
