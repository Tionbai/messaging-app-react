const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const chatroomController = require('../controllers/chatroomController.js');

const auth = require('../middlewares/auth.js');

router.get('/', auth, catchErrors(chatroomController.getAllChatrooms));
router.post('/', auth, catchErrors(chatroomController.createChatroom));

module.exports = router;
