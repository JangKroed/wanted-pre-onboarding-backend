import { Router } from 'express';
import UsersController from '../controllers/users.controller.js';

const router = Router();

const { signup, login } = new UsersController();

router.post('/signup', signup);
router.post('/login', login);

export default router;
