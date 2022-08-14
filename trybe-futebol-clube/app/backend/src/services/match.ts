import { IMatch } from '../interfaces/matches';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

const UNKNOWN_ERROR = 'An unknown error has occurred';
const VALID_MATCH = 'This match is valid';
const TEAM_DOES_NOT_EXIST = 'There is no team with such id!';
const TEAMS_ARE_EQUAL = 'It is not possible to create a match with two equal teams';
const MATCH_UPDATE_SUCCESS = 'Match has been successfully updated';
const MATCH_FINISH_SUCCESS = 'Match has been successfully finished';

export default class MatchService {
  constructor(private matchModel = Match, private teamModel = Team) {}

  private createParameters = (inProgress: string | boolean) => {
    let where = {};

    if (inProgress === 'true' || inProgress === 'false') {
      where = { inProgress: inProgress === 'true' };
    }

    const parameters = {
      include: [
        {
          model: Team,
          as: 'teamHome',
        },
        {
          model: Team,
          as: 'teamAway',
        },
      ],
      where,
    };

    return parameters;
  };

  public getAll = async (inProgress: string | boolean) => {
    const parameters = this.createParameters(inProgress);
    try {
      const result = await this.matchModel.findAll(parameters);
      return { code: 200, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };

  public validateMatch = async (match: IMatch) => {
    if (match.homeTeam === match.awayTeam) {
      return { success: false, code: 401, payload: { message: TEAMS_ARE_EQUAL } };
    }

    const homeTeamExists = await this.teamModel.findOne({
      where: { id: match.homeTeam },
    });
    const awayTeamExists = await this.teamModel.findOne({
      where: { id: match.awayTeam },
    });

    if (!homeTeamExists || !awayTeamExists) {
      return { success: false, code: 404, payload: { message: TEAM_DOES_NOT_EXIST } };
    }

    return { success: true, code: 200, payload: { message: VALID_MATCH } };
  };

  public create = async (match: IMatch) => {
    const matchIsValid = await this.validateMatch(match);

    if (!matchIsValid.success) {
      return { code: matchIsValid.code, data: matchIsValid.payload };
    }

    try {
      const result = await this.matchModel.create(match);
      return { code: 201, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };

  public updateMatch = async (id: number, valuesToUpdate: object) => {
    try {
      await this.matchModel.update(
        {
          ...valuesToUpdate,
        },
        {
          where: { id },
        },
      );
      return { code: 200, data: { message: MATCH_UPDATE_SUCCESS } };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };

  public finishMatch = async (id: string | number) => {
    try {
      await this.matchModel.update(
        {
          inProgress: 'false',
        },
        {
          where: { id },
        },
      );
      return { code: 200, data: { message: MATCH_FINISH_SUCCESS } };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };
}
