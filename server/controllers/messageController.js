require('../models/Chat.js');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

exports.newMessage = async (req, res) => {
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
};

// Get all messages the user has access to.
exports.getMessages = async (req, res) => {
  const userId = req.payload;

  // Get array of Chat IDs for all the user's accessed Chats.
  const chatIds = await Chat.find()
    .where('users')
    // (This can be an array of user IDs)
    .in(userId)
    // Only return the IDs of the Chats.
    .distinct('_id')
    .exec();

  // Get all messages from the Chat IDs array.
  const messages = await Message.find().where('chat').in(chatIds).exec();

  // Return the messages.
  res.json(messages);
};
