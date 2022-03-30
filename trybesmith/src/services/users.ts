import UsersModel from '../models/users';
import connection from '../models/connection';
import { User, Service, UserWithId } from '../interfaces/users';

export default class UsersService {
  model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async create(user: User): Promise<Service> {
    const result: UserWithId = await this.model.create(user);
    return { code: 201, data: result };
  }
}
