import { Router } from 'express';
import { usersController } from '../controllers/index.js';

const router = Router();

const { signup, login } = usersController;

router.post('/signup', signup);
router.post('/login', login);

export default router;
