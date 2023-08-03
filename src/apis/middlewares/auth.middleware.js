import { verifyJwt, decodedJwt, accessTokenSign } from '../../utils/jwt.js';
import { usersRepository } from '../../db/repositories/index.js';
import AppError from '../../utils/appError.js';
import env from '../../config.env.js';

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = env;

const cookieOption = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
};

const auth = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    const verify = verifyJwt(accessToken, ACCESS_TOKEN_SECRET);

    let user;

    if (!verify) {
      const decoded = decodedJwt(accessToken);
      if (!decoded) throw new AppError('return to login', 401);
      user = await usersRepository.findByEmail(decoded.email);

      const refreshVerify = verifyJwt(user.refreshToken, REFRESH_TOKEN_SECRET);
      if (!refreshVerify) throw new AppError('return to login', 401);

      res.cookie('accessToken', accessTokenSign(decoded.email), cookieOption);
    } else user = await usersRepository.findByEmail(verify.email);

    res.app.locals.user = user;

    next();
  } catch (error) {
    console.log('auth middleware error');
    next(error);
  }
};

export { auth, cookieOption };
