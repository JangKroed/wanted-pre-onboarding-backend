import { Boards } from '../models/index.js';

class BoardsRepository {
  pageSize = 5;

  createBoard = async (board) => {
    await Boards.create(board);
  };

  getBoardList = async ({ pageNum }) => {
    const offset = (pageNum - 1) * this.pageSize;
    return await Boards.findAll({
      offset,
      limit: this.pageSize,
      attributes: {
        exclude: ['contents'],
      },
      order: [['createdAt', 'DESC']],
    });
  };

  getBoard = async (boardId) => {
    return await Boards.findByPk(boardId);
  };

  updateBoard = async ({ boardId, title, contents }) => {
    await Boards.update({ title, contents }, { where: { boardId } });
  };

  deleteBoard = async ({ boardId }) => {
    await Boards.destroy({ where: { boardId } });
  };
}

export default BoardsRepository;
