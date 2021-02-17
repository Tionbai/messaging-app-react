const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const chatroomController = require('../controllers/chatroomController.js');

const auth = require('../middlewares/auth.js');

router.post('/', catchErrors(chatroomController.createChatroom));

module.exports = router;
