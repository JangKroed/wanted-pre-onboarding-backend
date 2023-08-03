import UsersRepository from './users.repository.js';
import BoardsRepository from './boards.repository.js';

const usersRepository = new UsersRepository();
const boardsRepository = new BoardsRepository();

export { usersRepository, boardsRepository };
