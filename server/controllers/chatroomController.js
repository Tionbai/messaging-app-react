require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

// Create new chatroom given a name and user(id).
exports.createChatroom = async (req, res) => {
  const { name } = req.body;
  const token = req.headers.authorization.trim().split(' ')[1];
  const payload = jwt.verify(token, process.env.SECRET);

  
  if (!name) throw 'Chatroom name must be provided.';
  
  const nameRegex = /^[A-Za-z\s]+$/;
  
  if (!nameRegex.test(name))
  throw 'Chatroom name can only contain alphabetical letters.';
  
  const chatroomExists = await Chatroom.findOne({ name });
  const userExists = await User.findOne({ _id: payload.id });

  if (chatroomExists) throw 'The chatroom name already exists.';
  if (!userExists) throw 'Only registered users can create chatrooms.';

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.users.push(payload.id);
  await chatroom.save();

  res.json({
    message: `Chatroom created by ${userExists.username}.`,
  });
};

// Get all chatrooms the user is added to.
exports.getAllChatrooms = async (req, res) => {
  const token = req.headers.authorization.trim().split(' ')[1];
  const payload = jwt.verify(token, process.env.SECRET);

  const chatrooms = await Chatroom.find({ users: { _id: payload.id } });
  res.json(chatrooms);
};

// Join existing chatroom.
exports.joinChatroom = async (req, res) => {
  const { name } = req.body;
  const token = req.headers.authorization.trim().split(' ')[1];
  const payload = jwt.verify(token, process.env.SECRET);

  const chatroom = await Chatroom.findOne({ name: name });
  const user = await User.findOne({ _id: payload.id });

  if (!chatroom) throw 'Chatroom does not exist.';
  if (!user) throw 'User does not exist.';

  // Add user to chatroom and save in database.
  await chatroom.users.push(user._id);
  chatroom.save();

  res.json({
    chatroom,
    message: `${user.username} successfully joined chatroom ${chatroom.name}`,
  });
};
