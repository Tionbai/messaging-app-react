require('../models/Chat.js');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

exports.newMessage = async (req, res) => {
  try {
    const { chatId, senderId, message } = req.body;

    if (!chatId || !senderId || !message)
      throw 'Chat, sender and message must be provided.';

    const chatExists = await Chat.findOne({ _id: chatId });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: senderId });
    if (!userExists) throw 'User does not exist.';

    const createdMessage = new Message({
      chat: chatId,
      sender: senderId,
      text: message,
    });

    await createdMessage.save();

    res.json(createdMessage);
  } catch (err) {
    throw err;
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params;
    const userId = req.payload;

    if (!messageId) throw 'Message ID must be provided.';

    const message = await Message.findById(messageId);

    if (!message) throw 'Message does not exist.';

    const chat = await Chat.findOne().where({ messages: { $in: messageId } });

    const userIsAdmin = chat.admin.toString() === userId;
    const userIsSender = message.sender.toString() === userId;

    if (!userIsAdmin || !userIsSender)
      throw 'Only chat admin or message sender can delete message.';

    await chat.updateOne({ $pull: { messages: { $in: [messageId] } } });
    await message.delete();

    res.json(message._id);
  } catch (err) {
    throw err;
  }
};
