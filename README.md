# jwt-ide

jwt-ide build on top of [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), JWT (ide) typically looks like the following.

```text
uuuuu.vvvvv.xxxxx.yyyyy.zzzzz
```

`uuuuu` is id (base64Url)
`vvvvv` is expire time (base64Url)
`xxxxx.yyyyy.zzzzz` is [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Install

```bash
npm install jwt-ide
```

## Use

```ts
import jwt from 'jwt-ide';

// create token
const token = jwt.sign({ id: 'uuid' }, 'super_secret_key', {
  expiresIn: '15m',
});

// get token id
const tokenId = jwt.getTokenId(token);

// get expires time
const expiresIn = jwt.getTokenExpire(token);

// get jwt token
const jwtToken = jwt.getJwtToken(token);

// get part of token (decode)
const [tokenId, expiresIn, jwtToken] = jwt.getToken(token);

// check expires only
const isExpire = jwt.isExpire(token);

// verify and check expires
try {
  const decoded = jwt.verify(token, 'super_secret_key');
  console.log(decoded);
} catch (err: any) {
  console.log(err);
}
```
