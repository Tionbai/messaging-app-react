require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

exports.createMessage = async (req, res) => {
  const { chatroomId, senderId, message } = req.body;

  if (!chatroomId || !senderId || !message)
    throw 'Chatroom, sender and message must be provided.';

  const chatroomIdExists = await Chatroom.findOne({ _id: chatroomId });

  const senderExists = await User.findOne({ _id: senderId });

  if (!chatroomIdExists) throw 'Chatroom does not exist.';

  if (!senderExists) throw 'The user does not exist.';

  const newMessage = new Message({
    chatroom: chatroomId,
    sender: senderId,
    text: message,
  });

  await newMessage.save();

  res.json({
    message: 'Message created.',
  });
};

// Get all messages the user has access to.
exports.getMessages = async (req, res) => {
  const userId = req.payload;

  // Get array of chatroom IDs for all the user's accessed chatrooms.
  const chatroomIds = await Chatroom.find()
    .where('users')
    // (This can be an array of user IDs)
    .in(userId)
    // Only return the IDs of the chatrooms.
    .distinct('_id')
    .exec();

  // Get all messages from the chatroom IDs array.
  const messages = await Message.find()
    .where('chatroom')
    .in(chatroomIds)
    .exec();

  // Return the messages.
  res.json(messages);
};
