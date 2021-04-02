require('../models/Chat.js');
const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');
const Message = mongoose.model('Message');

exports.newMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  if (!chatId || !senderId || !message)
    throw new Error('Chat, sender and message must be provided.');

  const chatExists = await Chat.findOne({ _id: chatId });
  if (!chatExists) throw new Error('Chat does not exist.');

  const createdMessage = new Message({
    chat: chatId,
    sender: senderId,
    text: message,
  });

  await createdMessage.save();

  res.json(createdMessage);
};

exports.deleteMessage = async (req, res) => {
  const messageId = req.params;
  const userId = req.payload;

  if (!messageId) throw new Error('Message ID must be provided.');

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message does not exist.');

  const chat = await Chat.findOne().where({ messages: { $in: messageId } });

  const userIsAdmin = chat.admin.toString() === userId;
  const userIsSender = message.sender.toString() === userId;

  if (!userIsAdmin || !userIsSender)
    throw new Error('Only chat admin or message sender can delete message.');

  await chat.updateOne({ $pull: { messages: { $in: [messageId] } } });
  await message.delete();

  res.json(message._id);
};
