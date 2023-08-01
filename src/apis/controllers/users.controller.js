import AppError from '../../utils/appError.js';

class UsersController {
  constructor() {}

  signupValidation = ({ email, password }) => {
    if (email.split('@').length > 2) throw new AppError('signup validation error.', 400);
    if (password.toString().length < 8) throw new AppError('signup validation error', 400);

    return { email, password };
  };

  signup = (req, res, next) => {
    try {
      const { email, password } = this.signupValidation(req.body);

      res.status(201).send({ ok: true, message: 'signup success' });
    } catch (error) {
      next(error);
    }
  };

  login = (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
