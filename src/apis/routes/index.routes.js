const { Router } = require('express');
const usersRoute = require('./users.route.js');
// const boardsRoute = require ('./boards.route.js');

const router = Router();

router.use('/users', usersRoute);
// router.use('/boards', boardsRoute);

module.exports = router;
