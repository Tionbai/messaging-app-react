require('../models/Chat.js');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

const checkIfChatExistsInDatabase = async (chatName) => {
  const chatExists = await Chat.findOne({ name: chatName });

  if (chatExists) return true;
  else return false;
};

const checkIfUserExistsInDatabase = async (userId) => {
  const userExists = await User.findOne({ _id: userId });

  if (userExists) return true;
  else return false;
};

// Get all chats the user is added to.
exports.getAllChats = async (req, res) => {
  const userId = req.payload;

  const chats = await Chat.find().where('users').in(userId);

  res.json(chats);
};

// Create new chat given a name and user(id).
exports.newChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  if (!name) throw 'Chat name must be provided.';

  const nameRegex = /^[a-zA-Z\s]*$/;

  if (!nameRegex.test(name))
    throw 'Chat name can only contain alphabetical letters.';

  if (checkIfChatExistsInDatabase(name) === true)
    throw 'The chat name already exists.';
  if (checkIfUserExistsInDatabase(userId) === false)
    throw 'Only registered users can create chats.';

  const chat = new Chat({
    name: name,
  });

  await chat.users.push(userId);
  await chat.save();

  res.json(chat);
};

// Join existing chat.
exports.joinChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  if (checkIfChatExistsInDatabase(name) === false) throw 'Chat does not exist.';
  if (checkIfUserExistsInDatabase(userId) === false)
    throw 'User does not exist.';

  const chatWithUser = await Chat.findOne({ name: name }).and({
    users: { $in: userId },
  });

  if (chatWithUser) throw 'You are already added to this chat.';

  // Add user to chat and save in database.
  const chat = await Chat.findOne({ name: name });
  await chat.users.push(userId);
  await chat.save();

  res.json(chat);
};

// Delete existing chat.
exports.deleteChat = async (req, res) => {
  const { name } = req.params;
  const userId = req.payload;

  if (checkIfChatExistsInDatabase(name) === false) throw 'Chat does not exist.';
  if (checkIfUserExistsInDatabase(userId) === false)
    throw 'User does not exist.';

  const chatWithUser = await Chat.findOne({ name: name }).and({
    users: { $in: userId },
  });
  if (!chatWithUser) throw 'You do not have permission to delete this chat.';

  await Message.deleteMany({ chat: chatWithUser._id }).exec();

  await chatWithUser.delete();

  res.json({
    message: `${chatWithUser.name} was successfully deleted.`,
  });
};
