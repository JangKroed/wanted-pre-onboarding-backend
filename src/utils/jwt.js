import JWT from 'jsonwebtoken';
import env from '../config.env.js';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = env;

const accessTokenSign = (email) => {
  return JWT.sign({ email }, ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

const refreshTokenSign = (email) => {
  return JWT.sign({ email }, REFRESH_TOKEN_SECRET, {
    expiresIn: '14d',
  });
};

const verifyJwt = (token, secret) => {
  try {
    return JWT.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export { verifyJwt, accessTokenSign, refreshTokenSign };
