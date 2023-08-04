import { verifyJwt, accessTokenSign, refreshTokenSign } from '../utils/jwt.js';
import bcrypt from 'bcrypt';
import { usersRepository } from '../db/repositories/index.js';
import AppError from '../utils/appError.js';

class UsersService {
  signup = async (userInfo) => {
    const hasEmail = await usersRepository.findByEmail(userInfo.email);
    if (hasEmail) throw new AppError('exist email', 400);

    const hashed = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashed;

    await usersRepository.createUser(userInfo);
  };

  login = async ({ email, password }) => {
    const hasUser = await usersRepository.findByEmail(email);
    if (!hasUser) throw new AppError('is not user email', 400);

    const isEqual = await bcrypt.compare(password, hasUser.password);
    if (!isEqual) throw new AppError('is not equal password', 400);

    const accessToken = accessTokenSign(email);
    hasUser.refreshToken = refreshTokenSign(email);

    hasUser.save();

    return { accessToken, refreshToken: hasUser.refreshToken };
  };
}

export default UsersService;
