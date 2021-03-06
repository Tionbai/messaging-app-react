const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const userController = require('../controllers/userController.js');
const auth = require('../middlewares/auth.js');

router.get('/', auth, catchErrors(userController.getUser));
router.post('/register', catchErrors(userController.register));
router.post('/login', catchErrors(userController.login));
router.delete('/:ref', auth, catchErrors(userController.delete));
router.put('/contacts/new', auth, catchErrors(userController.newContact));
router.delete(
  '/contacts/:ref',
  auth,
  catchErrors(userController.deleteContact),
);

module.exports = router;
