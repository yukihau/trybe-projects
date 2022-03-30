import { sign } from 'jsonwebtoken';
import { UserWithId } from '../interfaces/users';

const jwtSecret = 'jwtfortrybe';

const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' } as object;

const generateToken = (user: UserWithId) => {
  const token = sign(
    { ...user },
    jwtSecret,
    jwtConfig,
  );
  return token;
};

export default generateToken;
