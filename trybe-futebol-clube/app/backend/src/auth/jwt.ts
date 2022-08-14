import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { IJwtValidate, IUser } from '../interfaces/user';

const jwtSecret = readFileSync('jwt.evaluation.key', { encoding: 'utf-8' }) as string;

const jwtConfig = {
  algorithm: 'HS256',
  expiresIn: '7d',
};

const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Expired or invalid token';
const UNKNOWN_ERROR = 'An unknown error has occurred';

export default class JWT {
  public static createToken(user: object) {
    return jwt.sign(user, jwtSecret, jwtConfig as object);
  }

  public static async validate(token: string): Promise<IJwtValidate> {
    if (!token) return { success: false, payload: { message: TOKEN_NOT_FOUND } };

    try {
      const result = await jwt.verify(token, jwtSecret) as IUser;
      return { success: true, payload: result };
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
        return { success: false, payload: { message: INVALID_TOKEN } };
      }
      console.log(error);
      return { success: false, payload: { message: UNKNOWN_ERROR } };
    }
  }
}
