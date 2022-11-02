const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController');

router.get('/', userController.getAll);
router.get('/:id', userController.getONe);
router.put('/:id', userController.update);

module.exports = router;