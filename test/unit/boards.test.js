import httpMocks from 'node-mocks-http';
import { boardsController } from '../../src/apis/controllers/index.js';
import { boardsService } from '../../src/services/index.js';
import AppError from '../../src/utils/appError.js';

boardsService.createBoard = jest.fn();
boardsService.getBoardList = jest.fn();
boardsService.getBoard = jest.fn();
boardsService.updateBoard = jest.fn();
boardsService.deleteBoard = jest.fn();

const boardId = 1;
const userId = 1;

const newBoard = {
  title: 'title',
  contents: 'contents',
};

const updatedBoard = {
  boardId,
  userId,
  title: 'updated title',
  contents: 'updated contents',
};

const boardList = [
  {
    boardId: 1,
    userId,
    title: 'title1',
    contents: 'contents1',
  },
  {
    boardId: 2,
    userId,
    title: 'title2',
    contents: 'contents2',
  },
  {
    boardId: 3,
    userId,
    title: 'title3',
    contents: 'contents3',
  },
];

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('Boards Controller Create Board', () => {
  beforeEach(() => {
    req.body = newBoard;
    res.app = { locals: { user: { userId: '1' } } };
  });

  it('should have a createBoard function', () => {
    expect(typeof boardsController.createBoard).toBe('function');
  });

  it('should call boardsService.createBoard', () => {
    boardsController.createBoard(req, res, next);

    expect(boardsService.createBoard).toBeCalledWith({ ...newBoard, userId: 1 });
  });

  it('should return 201 response code', async () => {
    await boardsController.createBoard(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    boardsService.createBoard.mockReturnValue(newBoard);
    await boardsController.createBoard(req, res, next);

    expect(res._getJSONData()).toStrictEqual({ ok: true, message: 'create board success' });
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'description property missing' };
    const rejectedPromise = Promise.reject(errorMessage);

    boardsService.createBoard.mockReturnValue(rejectedPromise);
    await boardsController.createBoard(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Boards Controller Get Board List', () => {
  beforeEach(() => {
    req.query.pageNum = 1;
  });

  it('should have a getBoardList function', () => {
    expect(typeof boardsController.getBoardList).toBe('function');
  });

  it('should call boardsService.getBoardList', async () => {
    await boardsController.getBoardList(req, res, next);

    expect(boardsService.getBoardList).toHaveBeenCalledWith({ pageNum: 1 });
  });

  it('should return 200 response', async () => {
    await boardsController.getBoardList(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._isEndCalled()).toBeTruthy();
  });

  it('should return json body in response', async () => {
    boardsService.getBoardList.mockReturnValue(boardList);
    await boardsController.getBoardList(req, res, next);

    expect(res._getJSONData()).toStrictEqual({ boardList, ok: true });
  });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error finding product data' };
    const rejectedPromise = Promise.reject(errorMessage);

    boardsService.getBoardList.mockReturnValue(rejectedPromise);
    await boardsController.getBoardList(req, res, next);

    expect(next).toBeCalledWith(errorMessage);
  });
});

describe('Boards Controller Get Board By Id', () => {
  beforeEach(() => {
    // res.app = { locals: { user: { userId: '1' } } };
    req.params.boardId = boardId;
  });

  it('should have a getBoard', () => {
    expect(typeof boardsController.getBoard).toBe('function');
  });

  it('should call boardsService.getBoard', async () => {
    await boardsController.getBoard(req, res, next);

    expect(boardsService.getBoard).toBeCalledWith({ boardId });
  });

  it('should return json body and reponse code 200', async () => {
    boardsService.getBoard.mockReturnValue(newBoard);
    await boardsController.getBoard(req, res, next);

    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual({ board: newBoard, ok: true });
    expect(res._isEndCalled()).toBeTruthy();
  });

  // it('should return 404 when item doesnt exist', async () => {
  //   boardsService.getBoard.mockReturnValue(null);
  //   await boardsController.getBoard(req, res, next);

  //   expect(res.statusCode).toBe(404);
  //   expect(res._isEndCalled()).toBeTruthy();
  // });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);

    boardsService.getBoard.mockReturnValue(rejectedPromise);
    await boardsController.getBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('Boards Controller Update', () => {
  beforeEach(() => {
    res.app = { locals: { user: { userId } } };
    req.params = { boardId };
    req.body = updatedBoard;
  });

  it('should have an updateBoard function', () => {
    expect(typeof boardsController.updateBoard).toBe('function');
  });

  it('should call boardsService.updateBoard', async () => {
    await boardsController.updateBoard(req, res, next);

    expect(boardsService.updateBoard).toHaveBeenCalledWith(updatedBoard);
  });

  it('should return json body and response code 201', async () => {
    boardsService.updateBoard.mockReturnValue(updatedBoard);
    await boardsController.updateBoard(req, res, next);

    expect(res._isEndCalled()).toBeTruthy();
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual({ ok: true, message: 'board update success' });
  });

  // it('should handle 404 when item doesnt exist', async () => {
  //   boardsService.updateBoard.mockReturnValue(null);
  //   await boardsController.updateBoard(req, res, next);

  //   expect(res.statusCode).toBe(404);
  //   expect(res._isEndCalled()).toBeTruthy();
  // });

  it('should handle errors', async () => {
    const errorMessage = { message: 'error' };
    const rejectedPromise = Promise.reject(errorMessage);

    boardsService.updateBoard.mockReturnValue(rejectedPromise);
    await boardsController.updateBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('Boards Controller Delete', () => {
  beforeEach(() => {
    res.app = { locals: { user: { userId } } };
    req.params = { boardId };
  });

  it('should have a deleteProduct function', () => {
    expect(typeof boardsController.deleteBoard).toBe('function');
  });

  it('should call boardsService.deleteBoard', async () => {
    await boardsController.deleteBoard(req, res, next);

    expect(boardsService.deleteBoard).toBeCalledWith({ boardId, userId });
  });

  it('should return 201 response', async () => {
    await boardsController.deleteBoard(req, res, next);

    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual({ ok: true, message: 'board delete success' });
    expect(res._isEndCalled()).toBeTruthy();
  });

  // it('should handle 404 when item doesnt exist', async () => {
  //   boardsService.deleteBoard.mockReturnValue(null);
  //   await boardsController.deleteBoard(req, res, next);

  //   expect(res.statusCode).toBe(404);
  //   expect(res._isEndCalled()).toBeTruthy();
  // });

  it('should handle errors', async () => {
    const errorMessage = { message: 'Error deleting' };
    const rejectedPromise = Promise.reject(errorMessage);

    boardsService.deleteBoard.mockReturnValue(rejectedPromise);
    await boardsController.deleteBoard(req, res, next);

    expect(next).toHaveBeenCalledWith(errorMessage);
  });
});
