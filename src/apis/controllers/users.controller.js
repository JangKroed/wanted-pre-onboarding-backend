const AppError = require('../../utils/appError.js');

class UsersController {
  constructor() {}

  userValidation = ({ email, password, type }) => {
    if (email.split('@').length > 2) throw new AppError(`${type} validation error.`, 400);
    if (password.toString().length < 8) throw new AppError(`${type} validation error.`, 400);

    return { email, password };
  };

  signup = (req, res, next) => {
    try {
      const { email, password } = this.userValidation({ ...req.body, type: 'signup' });

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

module.exports = UsersController;
