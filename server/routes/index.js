const Router = require('express');
const router = new Router();

const authRouter = require('./authRouter');
const userRouter = require('./userRouter');

router.use('/user', authRouter);
router.use('/user', userRouter);

module.exports = router;