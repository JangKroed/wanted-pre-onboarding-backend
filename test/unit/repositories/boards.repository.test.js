import { boardsRepository } from '../../../src/db/repositories/index.js';
import { Boards } from '../../../src/db/models';
import { userId, boardId, newBoard, updatedBoard, boardList } from '../../data/board.data.js';

describe('BoardsRepository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('createBoard method', () => {
    it('should call Boards.create with the correct argument', async () => {
      jest.spyOn(Boards, 'create').mockResolvedValue();

      await boardsRepository.createBoard(newBoard);

      expect(Boards.create).toHaveBeenCalledWith(newBoard);
    });
  });

  describe('getBoardList method', () => {
    it('should call Boards.findAll with the correct arguments', async () => {
      jest.spyOn(Boards, 'findAll').mockResolvedValue([]);

      await boardsRepository.getBoardList({ pageNum: 1 });

      expect(Boards.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 5,
        order: [['createdAt', 'DESC']],
      });
    });
  });

  describe('getBoard method', () => {
    it('should call Boards.findByPk with the correct argument', async () => {
      jest.spyOn(Boards, 'findByPk').mockResolvedValue({});

      await boardsRepository.getBoard(1);

      expect(Boards.findByPk).toHaveBeenCalledWith(1);
    });
  });

  describe('updateBoard method', () => {
    it('should call Boards.update with the correct arguments', async () => {
      jest.spyOn(Boards, 'update').mockResolvedValue();

      await boardsRepository.updateBoard({
        boardId,
        ...updatedBoard,
      });

      expect(Boards.update).toHaveBeenCalledWith(updatedBoard, { where: { boardId: 1 } });
    });
  });

  describe('deleteBoard method', () => {
    it('should call Boards.destroy with the correct argument', async () => {
      jest.spyOn(Boards, 'destroy').mockResolvedValue();

      await boardsRepository.deleteBoard({ boardId });

      expect(Boards.destroy).toHaveBeenCalledWith({ where: { boardId } });
    });
  });
});
