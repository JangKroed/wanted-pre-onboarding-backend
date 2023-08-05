import { auth } from '../../../src/apis/middlewares/auth.middleware.js';
import * as jwtUtils from '../../../src/utils/jwt';

jest.spyOn(jwtUtils, 'accessTokenSign').mockReturnValue('mockAccessToken');
jest.spyOn(jwtUtils, 'verifyJwt');

const mockRequest = (accessToken) => ({
  cookies: {
    accessToken,
  },
});

const user = { email: 'test@example.com', refreshToken: 'refreshToken' };

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.app = { locals: { user } };
  return res;
};

const mockNext = jest.fn();

describe('auth middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate a user with a valid access token', async () => {
    const accessToken = 'validAccessToken';

    const req = mockRequest(accessToken);
    const res = mockResponse();

    await auth(req, res, mockNext);

    expect(jwtUtils.verifyJwt).toHaveBeenCalledWith(accessToken, expect.any(String));
    expect(req.cookies.accessToken).toBe(accessToken);
    expect(res.app.locals.user).toBe(user);
    expect(mockNext).toHaveBeenCalled();
  });

  it('should return 401 error if the access token is invalid', async () => {
    const accessToken = 'invalidToken';

    const req = mockRequest(accessToken);
    const res = mockResponse();

    res.app.locals.user = undefined;

    await auth(req, res, mockNext);

    expect(jwtUtils.verifyJwt).toHaveBeenCalledWith(accessToken, expect.any(String));
    expect(req.cookies.accessToken).toBe(accessToken);
    expect(res.app.locals.user).toBeUndefined();
    expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
  });
});
