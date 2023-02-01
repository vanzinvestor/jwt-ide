import {
  getJwtToken,
  getToken,
  getTokenExpire,
  getTokenId,
  isExpire,
  sign,
  verify,
} from '../src/index';
import assert from 'assert';
import {
  correctToken,
  incorrectTokenExpiresIn,
  incorrectTokenFormat,
  jwtSecret,
  jwtToken,
  tokenExpiresIn,
  tokenId,
} from './test.data';

describe('Index tests', function () {
  it('get correrct token id should return token id', function () {
    assert.equal(getTokenId(correctToken), tokenId);
  });
  it('get correrct token expiresIn should return time in miliseconds', function () {
    assert.equal(getTokenExpire(correctToken), tokenExpiresIn);
  });
  it('get incorrerct token expiresIn should throw Error', function () {
    assert.throws(
      () => getTokenExpire(incorrectTokenExpiresIn),
      /^Error: Token expires is not numeric$/
    );
  });
  it('get correrct token jwt should return jwt token', function () {
    assert.equal(getJwtToken(correctToken), jwtToken);
  });
  it('get correrct token array of token should return array of token', function () {
    assert.deepEqual(getToken(correctToken), [
      tokenId,
      tokenExpiresIn,
      jwtToken,
    ]);
  });
  it('get incorrerct token array of token should throw Error', function () {
    assert.throws(
      () => getToken(incorrectTokenExpiresIn),
      /^Error: Token expire is not numeric$/
    );
  });
  it('sign token expiresIn 5m should token', function () {
    const token = sign({ id: tokenId }, jwtSecret, { expiresIn: '5m' });
    assert.equal(token, token);
  });
  it('sign token expiresIn 180 should token', function () {
    const token = sign({ id: tokenId }, jwtSecret, { expiresIn: 180 });
    assert.equal(token, token);
  });
  it('sign token no options should token', function () {
    const token = sign({ id: tokenId }, jwtSecret);
    assert.equal(token, token);
  });
  it('verify token incorrect format should throw Error', function () {
    assert.throws(
      () => verify(incorrectTokenFormat, jwtSecret),
      /^Error: Invalid jwt-ide token format$/
    );
  });
  it('verify token expire incorrect should throw Error', function () {
    assert.throws(
      () => verify(incorrectTokenExpiresIn, jwtSecret),
      /^Error: Token expire is not numeric$/
    );
  });
  it('verify token expire should throw Error', function () {
    assert.throws(
      () => verify(correctToken, jwtSecret),
      /^Error: Token is expired$/
    );
  });
  /*it('verify token should throw TokenExpiredError', function () {
    assert.throws(
      () => verify(correctToken, jwtSecret),
      /^TokenExpiredError: jwt expired$/
    );
  });*/
  it('verify token valid should return payload', function () {
    const token = sign({ id: tokenId }, jwtSecret, { expiresIn: '5m' });
    const decoded = verify(token, jwtSecret);
    assert.equal(decoded, decoded);
  });
  it('isExpire token incorrect format should throw Error', function () {
    assert.throws(
      () => isExpire(incorrectTokenFormat),
      /^Error: Invalid jwt-ide token format$/
    );
  });
  it('isExpire token incorrect expire format should return true', function () {
    assert.equal(isExpire(incorrectTokenExpiresIn), true);
  });
  it('isExpire token valid should return false', function () {
    const token = sign({ id: tokenId }, jwtSecret, { expiresIn: '5m' });
    assert.equal(isExpire(token), false);
  });
  it('isExpire token expire should return true', function () {
    assert.equal(isExpire(correctToken), true);
  });
});
