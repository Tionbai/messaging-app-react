require('../models/Chatroom.js');
const mongoose = require('mongoose');
const Chatroom = mongoose.model('Chatroom');
const User = mongoose.model('User');

// Get all chatrooms the user is added to.
exports.getAllChatrooms = async (req, res) => {
  const userId = req.payload;

  const chatrooms = await Chatroom.find().where('users').in(userId);

  res.json(chatrooms);
};

// Create new chatroom given a name and user(id).
exports.createChatroom = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  if (!name) throw 'Chatroom name must be provided.';

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name))
    throw 'Chatroom name can only contain alphabetical letters.';

  const chatroomExists = await Chatroom.findOne({ name });
  const userExists = await User.findOne({ _id: userId });

  if (chatroomExists) throw 'The chatroom name already exists.';
  if (!userExists) throw 'Only registered users can create chatrooms.';

  const chatroom = new Chatroom({
    name,
  });

  // Add user to chatroom and save in database.
  await chatroom.users.push(user._id);
  await chatroom.save();
  // Add chatroom to user and save in database.
  await userExists.chatrooms.push(chatroom._id);
  user.save();

  res.json({
    message: `Chatroom created by ${userExists.username}.`,
  });
};


// Join existing chatroom.
exports.joinChatroom = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  const chatroom = await Chatroom.findOne({ name: name });
  const user = await User.findOne({ _id: userId });

  if (!chatroom) throw 'Chatroom does not exist.';
  if (!user) throw 'User does not exist.';

  // Add user to chatroom and save in database.
  await chatroom.users.push(user._id);
  chatroom.save();
  // Add chatroom to user and save in database.
  await user.chatrooms.push(chatroom._id);
  user.save();

  res.json({
    chatroom,
    message: `${user.username} successfully joined chatroom ${chatroom.name}`,
  });
};
