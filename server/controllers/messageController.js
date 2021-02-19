require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

exports.createMessage = async (req, res) => {
  const { chatroomId, senderId, message } = req.body;

  if (!chatroomId || !senderId || !message) throw 'Chatroom, sender and message must be provided.';

  const chatroomIdExists = await Chatroom. findOne({ _id: chatroomId});

  const senderExists = await User.findOne({ _id: senderId });


  if (!chatroomIdExists)
    throw 'Chatroom does not exist.';

  if (!senderExists) throw 'The user does not exist.';

  const newMessage = new Message({
    chatroom: chatroomId,
    sender: senderId,
    text: message,
  })

  await newMessage.save();

  res.json({
    message: 'Chatroom created.',
  });
};

exports.getMessages = async (req, res) => {
  const messages = await Message.find({});

  res.json(messages);
};
