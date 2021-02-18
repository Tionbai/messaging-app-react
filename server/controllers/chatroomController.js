require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name))
    throw 'Chatroom name can only contain alphabetical letters.';

  const chatroom = new Chatroom({
    name,
  });

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw 'Chatroom with that name already exists.';

  await chatroom.save();

  res.json({
    message: 'Chatroom created.',
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};
