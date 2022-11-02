const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть минимум 6 символов').isLength({min: 6})
], authController.register);
router.post('/login', authController.login);
router.get('/auth', authMiddleware, authController.check);

module.exports = router;