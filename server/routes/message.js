const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const messageController = require('../controllers/messageController.js');

const auth = require('../middlewares/auth.js');

router.get('/', auth, catchErrors(messageController.getMessages));
router.post('/', auth, catchErrors(messageController.newMessage));
router.delete('/:_id', auth, catchErrors(messageController.deleteMessage));

module.exports = router;
