import Match from '../database/models/Match';
import Team from '../database/models/Team';
import LeaderboardHelper from '../helpers/leaderboard';
import { ILeaderboard, Route } from '../interfaces/leaderboard';

export default class LeaderboardService {
  constructor(
    private matchModel = Match,
    private teamModel = Team,
    private helper = LeaderboardHelper,
  ) {}

  private generateLeaderboard = (teams: Team[], matches: Match[], route: Route) => {
    const leaderboard: ILeaderboard[] = teams.map((team) => {
      const matchesWithTeam = this.helper.getMatchesWithTeam(team, matches, route);

      return {
        name: team.teamName,
        totalPoints: this.helper.calculateTotalPoints(team, matchesWithTeam),
        totalGames: matchesWithTeam.length,
        totalVictories: this.helper.getTotalVictories(team, matchesWithTeam),
        totalDraws: this.helper.getTotalDraws(matchesWithTeam),
        totalLosses: this.helper.getTotalLosses(team, matchesWithTeam),
        goalsFavor: this.helper.calculateTotalGoals(team, matchesWithTeam, 'favor'),
        goalsOwn: this.helper.calculateTotalGoals(team, matchesWithTeam, 'own'),
        goalsBalance: this.helper.getGoalBalance(team, matchesWithTeam),
        efficiency: this.helper.calculateEfficiency(team, matchesWithTeam),
      };
    });

    return leaderboard;
  };

  public getLeaderboard = async (route: Route) => {
    const teams = await this.teamModel.findAll({ raw: true });
    const matches = await this.matchModel.findAll({ where: { inProgress: false }, raw: true });

    const leaderboard: ILeaderboard[] = this.generateLeaderboard(teams, matches, route);
    const result = this.helper.sortLeaderboard(leaderboard);

    return { code: 200, data: result };
  };
}
