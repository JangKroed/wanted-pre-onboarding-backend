const { Router } = require('express');
const { UsersController } = require('../controllers');

const router = Router();

const { signup, login } = new UsersController();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
