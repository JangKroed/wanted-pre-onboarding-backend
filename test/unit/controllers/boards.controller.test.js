import { boardsController } from '../../../src/apis/controllers/index.js';
import { boardsService } from '../../../src/services/index.js';
import { userId, boardId, newBoard, updatedBoard, boardList } from '../../data/board.data.js';

let req, res, next;

beforeEach(() => {
  req = { body: null, query: null, params: null };
  res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  next = jest.fn();
});

describe('createBoard method', () => {
  beforeEach(() => {
    req.body = newBoard;
    res.app = { locals: { user: { userId: 1 } } };
  });

  it('should call boardsService.createBoard and return status 201', async () => {
    jest.spyOn(boardsService, 'createBoard').mockResolvedValue();

    await boardsController.createBoard(req, res, next);

    expect(boardsService.createBoard).toHaveBeenCalledWith(newBoard);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ok: true, message: 'create board success' });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if title or contents are missing', async () => {
    req.body = null;
    await boardsController.createBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('getBoardList method', () => {
  beforeEach(() => {
    req.query = { pageNum: 1 };
  });

  it('should call boardsService.getBoardList and return status 200', async () => {
    jest.spyOn(boardsService, 'getBoardList').mockResolvedValue(boardList);

    await boardsController.getBoardList(req, res, next);

    expect(boardsService.getBoardList).toHaveBeenCalledWith({ pageNum: 1 });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true, boardList });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if pageNum is invalid', async () => {
    req.query.pageNum = null;

    await boardsController.getBoardList(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('getBoard method', () => {
  beforeEach(() => {
    req.params = { boardId };
  });

  it('should call boardsService.getBoard and return status 200', async () => {
    const board = {};

    jest.spyOn(boardsService, 'getBoard').mockResolvedValue(board);

    await boardsController.getBoard(req, res, next);

    expect(boardsService.getBoard).toHaveBeenCalledWith({ boardId });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ ok: true, board });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if boardId is invalid', async () => {
    req.params = null;

    await boardsController.getBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('updateBoard method', () => {
  beforeEach(() => {
    req.params = { boardId };
    req.body = updatedBoard;
    res.app = { locals: { user: { userId } } };
  });

  it('should call boardsService.updateBoard and return status 201', async () => {
    jest.spyOn(boardsService, 'updateBoard').mockResolvedValue();

    await boardsController.updateBoard(req, res, next);

    expect(boardsService.updateBoard).toHaveBeenCalledWith({
      userId: 1,
      boardId: 1,
      title: 'Updated Board',
      contents: 'Updated Contents',
    });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ok: true, message: 'board update success' });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if title or contents are missing', async () => {
    req.body = null;

    await boardsController.updateBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('deleteBoard method', () => {
  beforeEach(() => {
    req.params = { boardId };
    res.app = { locals: { user: { userId } } };
  });

  it('should call boardsService.deleteBoard and return status 201', async () => {
    jest.spyOn(boardsService, 'deleteBoard').mockResolvedValue();

    await boardsController.deleteBoard(req, res, next);

    expect(boardsService.deleteBoard).toHaveBeenCalledWith({ userId: 1, boardId: 1 });

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ ok: true, message: 'board delete success' });

    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with an error if boardId is invalid', async () => {
    req.params.boardId = null;

    await boardsController.deleteBoard(req, res, next);

    // Check if next function is called with an error
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
