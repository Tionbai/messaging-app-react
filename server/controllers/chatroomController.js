require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');

exports.createChatroom = async (req, res) => {
  const { name, users } = req.body;

  if (!name || !users) throw 'Name and users must be present.';

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name))
    throw 'Chatroom name can only contain alphabetical letters.';

  if (!users.length) throw 'The chatroom must have users.';

  const chatroomExists = await Chatroom.findOne({ name, users });

  if (chatroomExists) throw 'The chatroom already exists.';

  const chatroom = new Chatroom({
    name,
    users,
  });

  await chatroom.save();

  res.json({
    message: 'Chatroom created.',
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});

  res.json(chatrooms);
};
