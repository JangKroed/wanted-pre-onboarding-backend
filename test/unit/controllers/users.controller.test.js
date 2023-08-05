import { usersController } from '../../../src/apis/controllers/index.js';
import { usersService } from '../../../src/services/index.js';
import { newUser } from '../../data/user.data.js';

let req, res, next;

beforeEach(() => {
  req = { body: null };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn(), cookie: jest.fn() };
  next = jest.fn();
});

describe('signup method', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should call usersService.signup and return status 201', async () => {
    jest.spyOn(usersService, 'signup').mockResolvedValue();

    await usersController.signup(req, res, next);

    expect(usersService.signup).toHaveBeenCalledWith(req.body);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ok: true, message: 'signup success' });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if userValidation throws an error', async () => {
    req.body = { email: 'test@@example.com', password: 'test' };
    await usersController.signup(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('login method', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should call usersService.login, set cookies, and return status 200', async () => {
    jest.spyOn(usersService, 'login').mockResolvedValue({
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
    });

    await usersController.login(req, res, next);

    expect(usersService.login).toHaveBeenCalledWith(req.body);

    expect(res.cookie).toHaveBeenCalledWith('accessToken', 'mockAccessToken', expect.any(Object));
    expect(res.cookie).toHaveBeenCalledWith('refreshToken', 'mockRefreshToken', expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      ok: true,
      message: 'login success',
      accessToken: 'mockAccessToken',
    });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if userValidation throws an error', async () => {
    req.body = { email: 'test@@example.com', password: 'test' };

    await usersController.login(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
