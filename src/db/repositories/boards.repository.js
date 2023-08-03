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
      order: [['createdAt', 'DESC']], // 게시글을 생성일자 내림차순으로 정렬합니다.
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
