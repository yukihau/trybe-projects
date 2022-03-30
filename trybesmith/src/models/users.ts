import { Pool, ResultSetHeader } from 'mysql2/promise';
import { User, UserWithId } from '../interfaces/users';
import { CREATE_USER } from '../helpers/queries';

export default class UsersModel {
  connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<UserWithId> {
    const { username, classe, level, password } = user;
    const [result] = await this.connection.execute<ResultSetHeader>(
      CREATE_USER,
      [username, classe, level, password],
    );
    const { insertId } = result;
    return { id: insertId, username, classe, level, password };
  }
}
