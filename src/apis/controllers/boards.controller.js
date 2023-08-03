import AppError from '../../utils/appError.js';

class BoardsController {
  createBoards = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      if (!title || !content) throw new AppError('invalid input', 400);
    } catch (error) {
      next(error);
    }
  };
}

export default BoardsController;
