const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const userController = require('../controllers/userController.js');

router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));

module.exports = router;
