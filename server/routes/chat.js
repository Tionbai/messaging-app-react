const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers.js');
const chatController = require('../controllers/chatController.js');

const auth = require('../middlewares/auth.js');

router.get('/', auth, catchErrors(chatController.getAllChats));
router.post('/', auth, catchErrors(chatController.newChat));
router.post('/private', auth, catchErrors(chatController.newPrivateChat));
router.put('/join', auth, catchErrors(chatController.joinChat));
router.put('/leave', auth, catchErrors(chatController.leaveChat));
router.delete('/:name', auth, catchErrors(chatController.deleteChat));
router.delete('/messages/:name', auth, catchErrors(chatController.clearChat));
router.put('/addChatUser', auth, catchErrors(chatController.addChatUser));
router.put('/removeChatUser', auth, catchErrors(chatController.removeChatUser));
router.put('/makeAdmin', auth, catchErrors(chatController.makeAdmin));

module.exports = router;
