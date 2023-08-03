import { Router } from 'express';
import usersRoute from './users.route.js';
import boardsRoute from './boards.route.js';

const router = Router();

router.use('/users', usersRoute);
router.use('/boards', boardsRoute);

export default router;
