import AppError from '../../utils/appError.js';
import { Users } from '../../db/models/index.js';
import { usersService } from '../../services/index.js';

class UsersController {
  constructor() {}

  userValidation = ({ email, password, type }) => {
    if (email.trim() && email.split('@').length > 2)
      throw new AppError(`${type} validation error.`, 400);
    else if (password.trim() && password.toString().length < 8)
      throw new AppError(`${type} validation error.`, 400);
  };

  signup = async (req, res, next) => {
    try {
      this.userValidation({ ...req.body, type: 'signup' });

      const userInfo = await usersService.signup(req.body);

      res.status(201).send({ ok: true, message: 'signup success' });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      this.userValidation({ ...req.body, type: 'login' });

      const { accessToken } = await usersService.login(req.body);

      res.status(200).json({ ok: true, message: 'login success', accessToken });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
