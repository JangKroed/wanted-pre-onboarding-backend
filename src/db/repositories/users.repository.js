import { Users } from '../models/index.js';

class UsersRepository {
  constructor() {}

  createUser = async (userInfo) => {
    await Users.create(userInfo);
  };

  findByEmail = async (email) => {
    return await Users.findOne({ where: { email } });
  };

  findById = async (userId) => {
    return await Users.findByPk(userId, {
      attributes: {
        exclude: ['password'],
      },
    });
  };
}

export default UsersRepository;
