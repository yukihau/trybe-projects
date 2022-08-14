import { compare } from 'bcryptjs';
import { ILoginData, IUser } from '../interfaces/user';
import User from '../database/models/User';
import jwt from '../auth/jwt';

const USER_DOES_NOT_EXIST = 'User does not exist';
const INCORRECT_VALUES = 'Incorrect email or password';

export default class UserService {
  constructor(private model = User) {}

  public login = async (user: ILoginData) => {
    const result = await this.model.findOne(
      { where: { email: user.email },
        raw: true },
    ) as IUser;

    if (!result) return { code: 401, data: { message: USER_DOES_NOT_EXIST } };

    const token = jwt.createToken(result);
    const encryptedPassword = result.password as string;
    const passwordIsValid = await compare(user.password, encryptedPassword);

    if (!passwordIsValid) return { code: 401, data: { message: INCORRECT_VALUES } };

    delete result.password;

    return { code: 200, data: { user: result, token } };
  };

  public validate = async (token: string) => {
    const { success, payload } = await jwt.validate(token);

    if (!success) return { code: 401, data: payload };

    const { role } = payload as IUser;

    return { code: 200, data: role };
  };
}
