export const SEPARATOR = '.';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function base64UrlEncode(s: any) {
  const buff = Buffer.from(s, 'utf-8');
  return buff.toString('base64url');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function base64UrlDecode(s: any) {
  const buff = Buffer.from(s, 'base64url');
  return buff.toString('utf-8');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNumeric(value: any) {
  return /^\d+$/.test(value);
}

export function stringBuilder(...args: string[]) {
  return args.join('');
}

export function splitToken(
  token: string
): [id: string, expire: string, jwt: string] {
  const arr = token.split(SEPARATOR);

  if (arr.length !== 5) {
    throw new Error('Invalid jwt-ke token format');
  }

  const id = arr[0];

  const expire = arr[1];

  const jwt = arr[2] + SEPARATOR + arr[3] + SEPARATOR + arr[4];

  return [id, expire, jwt];
}
