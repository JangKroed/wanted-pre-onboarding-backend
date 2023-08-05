import { usersRepository } from '../../../src/db/repositories/index.js';
import { Users } from '../../../src/db/models/index.js';
import { newUser } from '../../data/user.data.js';

// Mock Users model for testing
Users.create = jest.fn();
Users.findOne = jest.fn();
Users.findByPk = jest.fn();

describe('createUser method', () => {
  it('should call Users.create with the provided userInfo', async () => {
    await usersRepository.createUser(newUser);

    // Check if Users.create is called with the provided newUser
    expect(Users.create).toHaveBeenCalledWith(newUser);
  });
});

describe('findByEmail method', () => {
  it('should call Users.findOne with the provided email', async () => {
    const email = newUser.email;
    await usersRepository.findByEmail(email);

    // Check if Users.findOne is called with the provided email
    expect(Users.findOne).toHaveBeenCalledWith({ where: { email } });
  });
});

describe('findById method', () => {
  it('should call Users.findByPk with the provided userId and exclude password', async () => {
    const userId = newUser.userId;
    await usersRepository.findById({ userId });

    // Check if Users.findByPk is called with the provided userId and attribute options
    expect(Users.findByPk).toHaveBeenCalledWith(
      { userId },
      {
        attributes: {
          exclude: ['password'],
        },
      }
    );
  });
});
