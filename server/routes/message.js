const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const messageController = require('../controllers/messageController.js');

const auth = require('../middlewares/auth.js');

router.get('/', auth, catchErrors(messageController.getMessages));
router.post('/', auth, catchErrors(messageController.createMessage));

module.exports = router;
