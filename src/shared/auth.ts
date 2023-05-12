import * as jwt from 'jsonwebtoken';
import config from 'config';
import { SecretConfig } from '../shared/interfaces/config.interface';
import HttpException from '../exceptions/httpException';

export function generateAccessToken(id: string): string {
  const secret: SecretConfig = config.get('auth');
  // token expires in one hour
  let exp = Math.floor(Date.now() / 1000) + 60 * 60;
  let iat = Math.floor(Date.now() / 1000);
  let payload = {
    sub: id,
    exp,
    iat,
  };
  const token = jwt.sign(payload, secret.privateKey);
  return token;
}
export function decodeToken(token: string) {
  const secret: SecretConfig = config.get('auth');

  if (!token) {
    throw new HttpException(401, 'Unauthorized');
  }

  try {
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, secret.privateKey);
    if (!decoded.sub) {
      throw new HttpException(401, 'Unauthorized');
    }
    return decoded.sub.toString();
  } catch (error) {
    throw new HttpException(500, 'Something went wrong');
  }
}
