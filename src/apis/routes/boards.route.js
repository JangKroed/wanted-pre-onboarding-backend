import { Router } from 'express';
import { boardsController } from '../controllers/index.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = Router();

const { createBoard, getBoardList, getBoard, updateBoard, deleteBoard } = boardsController;

router.get('/', getBoardList);
router.get('/:boardId', getBoard);
router.post('/', auth, createBoard);
router.put('/:boardId', auth, updateBoard);
router.delete('/:boardId', auth, deleteBoard);

export default router;
