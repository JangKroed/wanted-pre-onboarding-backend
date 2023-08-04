import httpMocks from 'node-mocks-http';
import { usersController } from '../../src/apis/controllers/index.js';
import { usersService } from '../../src/services/index.js';
import AppError from '../../src/utils/appError.js';

usersService.signup = jest.fn();
usersService.login = jest.fn();

const newUser = {
  email: 'test@gmail.com',
  name: 'test',
  password: '1q2w3e4r',
};

const loginUser = {
  email: 'test@gmail.com',
  password: '1q2w3e4r',
};

const usersServiceReturnValue = {
  ok: true,
  message: 'login success',
  accessToken: '',
};

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Users Controller Layer Signup Test', () => {
  beforeEach(() => {
    req.body = newUser;
  });

  it('should have a signup function', () => {
    expect(typeof usersController.signup).toBe('function');
  });

  it('should call usersService.signup', () => {
    usersController.signup(req, res, next);

    expect(usersService.signup).toBeCalledWith(newUser);
  });

  it('should return 201 response code', async () => {
    await usersController.signup(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    usersService.signup.mockReturnValue(newUser);
    await usersController.signup(req, res, next);

    expect(res._getJSONData()).toStrictEqual({ ok: true, message: 'signup success' });
  });

  it('should user validation success', async () => {
    await usersController.userValidation({ ...req.body, type: 'signup' });

    expect(res.statusCode).toBe(200);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);

    usersService.signup.mockReturnValue(rejectedPromise);
    await usersController.signup(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Users Controller Layer Login Test', () => {
  beforeEach(() => {
    req.body = loginUser;
  });

  it('should have a login function', () => {
    expect(typeof usersController.login).toBe('function');
  });

  it('should call usersController.login', async () => {
    await usersController.login(req, res, next);

    expect(usersService.login).toHaveBeenCalledWith(loginUser);
  });

  it('should return 200 response', async () => {
    usersService.login.mockReturnValue(usersServiceReturnValue);
    await usersController.login(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    usersService.login.mockReturnValue(usersServiceReturnValue);
    await usersController.login(req, res, next);

    expect(res._getJSONData()).toStrictEqual(usersServiceReturnValue);
  });

  it('should user validation success', async () => {
    await usersController.userValidation({ ...req.body, type: 'login' });

    expect(res.statusCode).toBe(200);
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectedPromise = Promise.reject(errorMessage);

    usersService.login.mockReturnValue(rejectedPromise);
    await usersController.login(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});
