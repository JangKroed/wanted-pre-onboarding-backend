import AppError from '../../utils/appError.js';
import { boardsService } from '../../services/index.js';

class BoardsController {
  paramsValidation = (params) => {
    const key = Object.keys(params)[0];
    if (!Number(params[key])) throw new AppError('invalid params', 400);

    return params;
  };

  createBoard = async (req, res, next) => {
    try {
      const { title, contents } = req.body;
      const { userId } = res.app.locals.user;

      if (!title || !contents) throw new AppError('invalid input', 400);

      await boardsService.createBoard({ title, contents, userId: Number(userId) });

      res.status(201).json({ ok: true, message: 'create board success' });
    } catch (error) {
      next(error);
    }
  };

  getBoardList = async (req, res, next) => {
    try {
      const { pageNum } = this.paramsValidation(req.query);

      const boardList = await boardsService.getBoardList({ pageNum: Number(pageNum) });

      res.status(200).json({ ok: true, boardList });
    } catch (error) {
      next(error);
    }
  };

  getBoard = async (req, res, next) => {
    try {
      const { boardId } = this.paramsValidation(req.params);

      const board = await boardsService.getBoard({ boardId: Number(boardId) });

      res.status(200).json({ ok: true, board });
    } catch (error) {
      next(error);
    }
  };

  updateBoard = async (req, res, next) => {
    try {
      const { userId } = res.app.locals.user;
      const { title, contents } = req.body;
      const { boardId } = this.paramsValidation(req.params);

      await boardsService.updateBoard({
        userId: Number(userId),
        boardId: Number(boardId),
        title,
        contents,
      });

      res.status(201).json({ ok: true, message: 'board update success' });
    } catch (error) {
      next(error);
    }
  };

  deleteBoard = async (req, res, next) => {
    try {
      const { userId } = res.app.locals.user;
      const { boardId } = this.paramsValidation(req.params);

      await boardsService.deleteBoard({ userId: Number(userId), boardId: Number(boardId) });

      res.status(201).json({ ok: true, message: 'board delete success' });
    } catch (error) {
      next(error);
    }
  };
}

export default BoardsController;
