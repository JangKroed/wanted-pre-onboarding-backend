import { usersService } from '../../../src/services/index.js';
import { usersRepository } from '../../../src/db/repositories/index.js';
import AppError from '../../../src/utils/appError.js';
import bcrypt from 'bcrypt';
// jest.mock('jsonwebtoken');
import * as jwtUtils from '../../../src/utils/jwt.js';

usersRepository.findByEmail = jest.fn();
usersRepository.createUser = jest.fn();

bcrypt.hash = jest.fn();
bcrypt.compare = jest.fn();

// jwtUtils 모듈 내부의 함수를 모의(Mock) 함수로 대체합니다.
jest.spyOn(jwtUtils, 'accessTokenSign').mockReturnValue('mockAccessToken');
jest.spyOn(jwtUtils, 'refreshTokenSign').mockReturnValue('mockRefreshToken');

describe('signup method', () => {
  it('should signup a new user successfully', async () => {
    usersRepository.findByEmail.mockResolvedValue(null);

    bcrypt.hash.mockResolvedValue('hashedPassword');

    const userInfo = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    await usersService.signup(userInfo);

    expect(usersRepository.findByEmail).toHaveBeenCalledWith(userInfo.email);
    expect(usersRepository.createUser).toHaveBeenCalledWith({
      ...userInfo,
      password: 'hashedPassword',
    });
  });

  it('should throw an error if email already exists', async () => {
    usersRepository.findByEmail.mockResolvedValue({
      email: 'test@example.com',
      password: 'hashedPassword',
    });

    const userInfo = {
      email: 'test@example.com',
      password: 'testpassword',
    };

    await expect(usersService.signup(userInfo)).rejects.toThrow(new AppError('exist email', 400));
  });
});

// login 메서드 테스트
describe('login method', () => {
  it('should login a user successfully', async () => {
    const userEmail = 'test@example.com';
    const userPassword = 'testpassword';

    // findByEmail 메서드가 존재하는 user를 반환하도록 설정합니다.
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const user = {
      email: userEmail,
      password: hashedPassword,
      save: jest.fn(), // save 메서드를 모의(Mock) 함수로 대체합니다.
    };
    usersRepository.findByEmail.mockResolvedValue(user);

    // bcrypt.compare 메서드가 true를 반환하도록 설정합니다.
    bcrypt.compare.mockResolvedValue(true);

    // login 메서드를 호출하고 예상 결과를 확인합니다.
    const result = await usersService.login({
      email: userEmail,
      password: userPassword,
    });

    // findByEmail 메서드가 올바르게 호출되었는지 확인합니다.
    expect(usersRepository.findByEmail).toHaveBeenCalledWith(userEmail);

    // bcrypt.compare 메서드가 올바르게 호출되었는지 확인합니다.
    expect(bcrypt.compare).toHaveBeenCalledWith(
      userPassword,
      hashedPassword // 실제 해시된 비밀번호를 전달합니다.
    );

    // jwtUtils 모듈 내부의 함수가 올바르게 호출되었는지 확인합니다.
    expect(jwtUtils.accessTokenSign).toHaveBeenCalledWith(userEmail);
    expect(jwtUtils.refreshTokenSign).toHaveBeenCalledWith(userEmail);

    // 데이터베이스 모델의 save 메서드가 호출되었는지 확인합니다.
    expect(user.save).toHaveBeenCalled();
  });

  it('should throw an error if email is not found', async () => {
    // findByEmail 메서드가 null을 반환하여 사용 가능한 email임을 가정합니다.
    usersRepository.findByEmail.mockResolvedValue(null);

    const userEmail = 'test@example.com';
    const userPassword = 'testpassword';

    // login 메서드를 호출하면 예상대로 에러가 발생하는지 확인합니다.
    await expect(usersService.login({ email: userEmail, password: userPassword })).rejects.toThrow(
      new AppError('is not user email', 400)
    );
  });

  it('should throw an error if password is not equal', async () => {
    const userEmail = 'test@example.com';
    const userPassword = 'testpassword';

    // findByEmail 메서드가 존재하는 user를 반환하도록 설정합니다.
    usersRepository.findByEmail.mockResolvedValue({
      email: userEmail,
      password: await bcrypt.hash('differentpassword', 10), // 다른 비밀번호를 사용합니다.
    });

    // bcrypt.compare 메서드가 false를 반환하도록 설정합니다.
    bcrypt.compare.mockResolvedValue(false);

    // login 메서드를 호출하면 예상대로 에러가 발생하는지 확인합니다.
    await expect(usersService.login({ email: userEmail, password: userPassword })).rejects.toThrow(
      new AppError('is not equal password', 400)
    );
  });
});
