const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const messageController = require('../controllers/messageController.js');

// const auth = require('../middlewares/auth.js');

router.get('/', catchErrors(messageController.getMessages))
router.post('/', catchErrors(messageController.createMessage))

module.exports = router;
