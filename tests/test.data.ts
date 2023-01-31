export const jwtSecret = 'DwIz2mksQpmV48C5z3zzwPaFD5gFXanYOZg2jf3wycc=';

export const tokenId = '260d21dc-73a4-4dee-ba9b-eebb67189f5f';

export const base64urlTokenId =
  'MjYwZDIxZGMtNzNhNC00ZGVlLWJhOWItZWViYjY3MTg5ZjVm';

export const tokenExpiresIn = 1675142563673;

export const base64urlTokenExpiresIn = 'MTY3NTE0MjU2MzY3Mw';

export const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjI2MGQyMWRjLTczYTQtNGRlZS1iYTliLWVlYmI2NzE4OWY1ZiIsImlhdCI6MTY3NTE0MjI2MywiZXhwIjoxNjc1MTQyNTYzfQ.2Iml3PgO3N8oEBbMne4Y1sA5nQbguzM_R4RWdfnHbUw';

export const correctToken =
  base64urlTokenId + '.' + base64urlTokenExpiresIn + '.' + jwtToken;

export const incorrectTokenFormat =
  base64urlTokenId + '.' + base64urlTokenExpiresIn + '.incorrect.' + jwtToken;

export const incorrectTokenExpiresIn =
  base64urlTokenId + '.' + 'MTY3NTE0MjU2MzY3M2FiYw' + '.' + jwtToken;
