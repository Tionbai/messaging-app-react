const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const userController = require('../controllers/userController.js');
const auth = require('../middlewares/auth.js');

router.post('/login', catchErrors(userController.login));
router.post('/register', catchErrors(userController.register));
router.get('/getContacts', auth, catchErrors(userController.getContacts));
router.post('/newContact', auth, catchErrors(userController.newContact));

module.exports = router;
