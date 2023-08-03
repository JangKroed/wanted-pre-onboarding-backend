import { boardsRepository, usersRepository } from '../db/repositories/index.js';
import AppError from '../utils/appError.js';

class BoardsService {
  hasUser = async ({ userId }) => {
    const hasUser = await usersRepository.findById(userId);
    if (!hasUser) throw new AppError('invalid user id');
  };

  isBoardWriterMatch = async ({ userId, boardId }) => {
    const board = await this.getBoard({ boardId });
    if (board.userId !== userId) throw new AppError('User ID mismatch', 401);

    this.hasUser({ userId });
  };

  createBoard = async (board) => {
    await this.hasUser({ userId: Number(board.userId) });

    await boardsRepository.createBoard(board);
  };

  getBoardList = async ({ pageNum }) => {
    return await boardsRepository.getBoardList({ pageNum });
  };

  getBoard = async ({ boardId }) => {
    const findBoard = await boardsRepository.getBoard(boardId);
    if (!findBoard) throw new AppError('invail board id', 400);

    return findBoard;
  };

  updateBoard = async ({ userId, boardId, title, contents }) => {
    await this.isBoardWriterMatch({ userId, boardId });

    await boardsRepository.updateBoard({ boardId, title, contents });
  };

  deleteBoard = async ({ userId, boardId }) => {
    await this.isBoardWriterMatch({ userId, boardId });

    await boardsRepository.deleteBoard({ boardId });
  };
}

export default BoardsService;
