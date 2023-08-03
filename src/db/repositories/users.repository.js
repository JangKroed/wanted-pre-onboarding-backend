import { Users } from '../models/index.js';

class UsersRepository {
  constructor() {}

  createUser = async (userInfo) => {
    return await Users.create(userInfo);
  };

  findByEmail = async (email) => {
    return await Users.findOne({ where: { email } });
  };
}

export default UsersRepository;
