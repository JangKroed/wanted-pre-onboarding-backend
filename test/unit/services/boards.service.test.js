import { boardsService } from '../../../src/services/index.js';
import { boardsRepository, usersRepository } from '../../../src/db/repositories/index.js';
import AppError from '../../../src/utils/appError.js';
import { userId, boardId, newBoard, updatedBoard, boardList } from '../../data/board.data.js';

describe('BoardsService', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('hasUser method', () => {
    it('should not throw an error if user exists', async () => {
      jest.spyOn(usersRepository, 'findById').mockResolvedValue({});

      await expect(boardsService.hasUser({ userId })).resolves.not.toThrow();
    });

    it('should throw an error if user does not exist', async () => {
      jest.spyOn(usersRepository, 'findById').mockResolvedValue(null);

      await expect(boardsService.hasUser({ userId })).rejects.toThrow(AppError);
    });
  });

  describe('isBoardWriterMatch method', () => {
    it('should not throw an error if board writer matches the userId', async () => {
      jest.spyOn(boardsService, 'getBoard').mockResolvedValue({ userId });
      jest.spyOn(boardsService, 'hasUser').mockResolvedValue();

      await expect(boardsService.isBoardWriterMatch({ userId, boardId })).resolves.not.toThrow();
    });

    it('should throw an error if board writer does not match the userId', async () => {
      jest.spyOn(boardsService, 'getBoard').mockResolvedValue({ userId: 2 });

      await expect(boardsService.isBoardWriterMatch({ userId, boardId })).rejects.toThrow(AppError);
    });
  });

  describe('createBoard method', () => {
    it('should call this.hasUser and boardsRepository.createBoard', async () => {
      jest.spyOn(boardsService, 'hasUser').mockResolvedValue();
      jest.spyOn(boardsRepository, 'createBoard').mockResolvedValue();

      await boardsService.createBoard(newBoard);

      expect(boardsService.hasUser).toHaveBeenCalledWith({ userId });

      expect(boardsRepository.createBoard).toHaveBeenCalledWith(newBoard);
    });
  });

  describe('getBoardList method', () => {
    it('should call boardsRepository.getBoardList', async () => {
      jest.spyOn(boardsRepository, 'getBoardList').mockResolvedValue([]);

      await boardsService.getBoardList({ pageNum: 1 });

      expect(boardsRepository.getBoardList).toHaveBeenCalledWith({ pageNum: 1 });
    });
  });

  describe('getBoard method', () => {
    it('should return the board if it exists', async () => {
      jest.spyOn(boardsRepository, 'getBoard').mockResolvedValue({});

      await expect(boardsService.getBoard({ boardId })).resolves.toEqual({});

      expect(boardsRepository.getBoard).toHaveBeenCalledWith(1);
    });

    it('should throw an error if board does not exist', async () => {
      jest.spyOn(boardsRepository, 'getBoard').mockResolvedValue(null);

      await expect(boardsService.getBoard({ boardId })).rejects.toThrow(AppError);
    });
  });

  describe('updateBoard method', () => {
    it('should call this.isBoardWriterMatch and boardsRepository.updateBoard', async () => {
      jest.spyOn(boardsService, 'isBoardWriterMatch').mockResolvedValue();

      jest.spyOn(boardsRepository, 'updateBoard').mockResolvedValue();

      await boardsService.updateBoard({
        userId,
        boardId,
        ...updatedBoard,
      });

      expect(boardsService.isBoardWriterMatch).toHaveBeenCalledWith({ userId, boardId });

      expect(boardsRepository.updateBoard).toHaveBeenCalledWith({
        boardId,
        ...updatedBoard,
      });
    });
  });

  describe('deleteBoard method', () => {
    it('should call this.isBoardWriterMatch and boardsRepository.deleteBoard', async () => {
      jest.spyOn(boardsService, 'isBoardWriterMatch').mockResolvedValue();
      jest.spyOn(boardsRepository, 'deleteBoard').mockResolvedValue();

      await boardsService.deleteBoard({ userId, boardId });

      expect(boardsService.isBoardWriterMatch).toHaveBeenCalledWith({ userId, boardId });
      expect(boardsRepository.deleteBoard).toHaveBeenCalledWith({ boardId });
    });
  });
});
