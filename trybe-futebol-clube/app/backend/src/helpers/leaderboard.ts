import Match from '../database/models/Match';
import { ITeam } from '../interfaces/team';
import {
  GoalType,
  ILeaderboard,
  LeaderboardParams,
  Route,
  TeamArea,
} from '../interfaces/leaderboard';

export default class LeaderboardHelper {
  static getMatchesWithTeam = (team: ITeam, matches: Match[], route: Route): Match[] => {
    const { id } = team;
    let result;

    if (route === 'all') {
      result = matches.filter(
        (match) => match.homeTeam === id || match.awayTeam === id,
      );
    } else {
      const teamArea = `${route}Team` as TeamArea;

      result = matches.filter(
        (match) => match[teamArea] === id,
      );
    }

    console.log(result);

    return result;
  };

  static getTotalVictories = (team: ITeam, matches: Match[]) => {
    const { id } = team;

    const result = matches.filter(
      (match) =>
        (match.homeTeam === id && match.homeTeamGoals > match.awayTeamGoals)
        || (match.awayTeam === id && match.awayTeamGoals > match.homeTeamGoals),
    );

    return result.length;
  };

  static getTotalDraws = (matches: Match[]) => {
    const result = matches.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    );

    return result.length;
  };

  static getTotalLosses = (team: ITeam, matches: Match[]) => {
    const { id } = team;

    const result = matches.filter((match) =>
      (match.homeTeam === id && match.homeTeamGoals < match.awayTeamGoals)
      || (match.awayTeam === id && match.awayTeamGoals < match.homeTeamGoals));

    return result.length;
  };

  static getTeamGoals = (team: ITeam, matches: Match[]) => {
    const { id } = team;

    const result = matches.map((match) => {
      if (match.homeTeam === id) return match.homeTeamGoals;
      return match.awayTeamGoals;
    });

    return result;
  };

  static getOpponentGoals = (team: ITeam, matches: Match[]) => {
    const { id } = team;

    const result = matches.map((match) => {
      if (match.homeTeam !== id) return match.homeTeamGoals;
      return match.awayTeamGoals;
    });

    return result;
  };

  static calculateTotalGoals = (team: ITeam, matches: Match[], type: GoalType): number => {
    let totalGoals = 0;

    if (type === 'favor') {
      const teamGoals = this.getTeamGoals(team, matches);
      totalGoals = teamGoals.reduce((total, curr) => total + curr, 0);
    }

    if (type === 'own') {
      const opponentGoals = this.getOpponentGoals(team, matches);
      totalGoals = opponentGoals.reduce((total, curr) => total + curr, 0);
    }

    return totalGoals;
  };

  static getGoalBalance = (team: ITeam, matches: Match[]) => {
    const totalFavorGoals = this.calculateTotalGoals(team, matches, 'favor');
    const totalOwnGoals = this.calculateTotalGoals(team, matches, 'own');

    return totalFavorGoals - totalOwnGoals;
  };

  static calculateTotalPoints = (team: ITeam, matches: Match[]) => {
    const totalVictoryPoints = this.getTotalVictories(team, matches) * 3;
    const totalDraws = this.getTotalDraws(matches);
    const result = totalVictoryPoints + totalDraws;

    return result;
  };

  static calculateEfficiency = (team: ITeam, matches: Match[]) => {
    const totalGames = matches.length;
    const totalPoints = this.calculateTotalPoints(team, matches);

    const efficiency = Number((totalPoints / (totalGames * 3)) * 100);

    return parseFloat(efficiency.toFixed(2));
  };

  static isLowerOrHigher = (a: ILeaderboard, b: ILeaderboard, params: LeaderboardParams) => {
    if (a[params] > b[params]) return -1;
    if (a[params] < b[params]) return 1;
    return false;
  };

  static breakTie = (a: ILeaderboard, b: ILeaderboard) => {
    // Verify all of the four values
    const victoriesAreLowerOrHigher = this.isLowerOrHigher(a, b, 'totalVictories');
    if (victoriesAreLowerOrHigher) return victoriesAreLowerOrHigher;

    const goalBalanceIsLowerOrHigher = this.isLowerOrHigher(a, b, 'goalsBalance');
    if (goalBalanceIsLowerOrHigher) return goalBalanceIsLowerOrHigher;

    const favorGoalsAreLowerOrHigher = this.isLowerOrHigher(a, b, 'goalsFavor');
    if (favorGoalsAreLowerOrHigher) return favorGoalsAreLowerOrHigher;

    const ownGoalsAreLowerOrHigher = this.isLowerOrHigher(a, b, 'goalsOwn');
    if (ownGoalsAreLowerOrHigher) return ownGoalsAreLowerOrHigher;

    // If it still ties,
    return 0;
  };

  static sortLeaderboard = (leaderboard: ILeaderboard[]) => {
    const sorted = leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (b.totalPoints > a.totalPoints) return 1;

      // Else, if it ties...
      const result = this.breakTie(a, b);

      return result;
    });

    return sorted;
  };
}
