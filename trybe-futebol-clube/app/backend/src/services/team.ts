import Team from '../database/models/Team';

const UNKNOWN_ERROR = 'An unknown error has occurred';

export default class TeamService {
  constructor(private model = Team) {}

  public getAll = async () => {
    try {
      const result = await this.model.findAll();
      return { code: 200, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };

  public getById = async (id: number) => {
    try {
      const result = await this.model.findByPk(id);
      return { code: 200, data: result };
    } catch (error) {
      console.log(error);
      return { code: 500, data: { message: UNKNOWN_ERROR } };
    }
  };
}
