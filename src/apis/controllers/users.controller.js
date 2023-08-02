import AppError from '../../utils/appError.js';
import { Users } from '../../db/models/index.js';

class UsersController {
  constructor() {}

  userValidation = ({ email, password, type }) => {
    if (email.split('@').length > 2) throw new AppError(`${type} validation error.`, 400);
    if (password.toString().length < 8) throw new AppError(`${type} validation error.`, 400);

    return { email, password };
  };

  signup = async (req, res, next) => {
    try {
      const { email, password } = this.userValidation({ ...req.body, type: 'signup' });

      const userInfo = await Users.create({ email, password, name: 'test' });
      console.log(userInfo);

      res.status(201).send({ ok: true, message: 'signup success' });
    } catch (error) {
      next(error);
    }
  };

  login = (req, res, next) => {
    try {
      const { email, password } = this.userValidation({ ...req.body, type: 'signup' });

      res.status(200).json({ ok: true, message: 'login success' });
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
