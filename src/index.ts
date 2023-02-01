import jwt from 'jsonwebtoken';
import ms from 'ms';
import {
  SEPARATOR,
  base64UrlDecode,
  base64UrlEncode,
  isNumeric,
  splitToken,
  stringBuilder,
} from './utils';

export function getTokenId(token: string) {
  const [id, ,] = splitToken(token);

  return base64UrlDecode(id);
}

export function getTokenExpire(token: string) {
  const [, expire] = splitToken(token);

  const expireUtf8 = base64UrlDecode(expire);

  if (!isNumeric(expireUtf8)) {
    throw new Error('Token expires is not numeric');
  }

  return parseInt(expireUtf8);
}

export function getJwtToken(token: string) {
  const [, , jwt] = splitToken(token);

  return jwt;
}

export function getToken(
  token: string
): [id: string, expire: number, jwt: string] {
  const [id, expire, jwt] = splitToken(token);

  const expireUtf8 = base64UrlDecode(expire);

  if (!isNumeric(expireUtf8)) {
    throw new Error('Token expire is not numeric');
  }

  return [base64UrlDecode(id), parseInt(expireUtf8), jwt];
}

export type JwtPayload = {
  id: string | number;
  [key: string]: unknown;
};

export function sign(
  payload: JwtPayload,
  secretOrPrivateKey: jwt.Secret,
  options?: jwt.SignOptions | undefined
) {
  const jwtToken = jwt.sign(payload, secretOrPrivateKey, options);

  const expiresIn = options?.expiresIn;

  let expire: number;

  if (expiresIn && typeof expiresIn === 'string') {
    expire = Date.now() + ms(expiresIn);
  } else if (expiresIn && typeof expiresIn === 'number') {
    expire = Date.now() + expiresIn;
  } else {
    expire = Date.now() + 120;
  }

  const token = stringBuilder(
    base64UrlEncode(payload.id),
    SEPARATOR,
    base64UrlEncode(expire),
    SEPARATOR,
    jwtToken
  );

  return token;
}

export function verify(
  token: string,
  secretOrPublicKey: jwt.Secret,
  options?: jwt.VerifyOptions & {
    complete?: false | undefined;
  }
) {
  try {
    const [, expire, jwtToken] = splitToken(token);

    const expireUtf8 = base64UrlDecode(expire);

    if (!isNumeric(expireUtf8)) {
      throw new Error('Token expire is not numeric');
    }

    const expireNumber = parseInt(expireUtf8);

    if (Date.now() > expireNumber) {
      throw new Error('Token is expired');
    }

    return jwt.verify(jwtToken, secretOrPublicKey, options);
  } catch (err: unknown) {
    throw err as Error;
  }
}

export function isExpire(token: string) {
  const [, expire] = splitToken(token);

  const expireUtf8 = base64UrlDecode(expire);

  if (!isNumeric(expireUtf8)) {
    return true;
  }

  const expireNumber = parseInt(expireUtf8);

  if (Date.now() < expireNumber) {
    return false;
  }

  return true;
}

export default {
  getTokenId,
  getTokenExpire,
  getJwtToken,
  getToken,
  sign,
  verify,
  isExpire,
};
