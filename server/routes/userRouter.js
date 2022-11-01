const Router = require('express');
const router = new Router();
const {check} = require('express-validator');

const userController = require('../controllers/userController');

router.post('/register', [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Пароль должен быть минимум 6 символов').isLength({min: 6})
], userController.register);
router.post('/login', userController.login);
router.get('/', userController.getAll);
router.get('/:id', userController.getONe);
router.put('/:id', userController.update);


module.exports = router;