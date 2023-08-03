import UsersService from './users.service.js';
import BoardsService from './boards.service.js';

const usersService = new UsersService();
const boardsService = new BoardsService();

export { usersService, boardsService };
