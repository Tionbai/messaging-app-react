require('../models/Chat.js');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

// Get all chats the user is added to.
exports.getAllChats = async (req, res) => {
  try {
    const userId = req.payload;

    const chats = await Chat.find().where('users').in(userId);

    res.json(chats);
  } catch (err) {
    console.error(err);
  }
};

// Create new chat given a name and user(id).
exports.newChat = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.payload;

    if (!name) throw 'Chat name must be provided.';

    const nameRegex = /^[a-zA-Z\s]*$/;

    if (!nameRegex.test(name))
      throw 'Chat name can only contain alphabetical letters.';

    const chatExists = await Chat.findOne({ name: name });
    if (chatExists) throw 'The chat name already exists.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'Only registered users can create chats.';

    const chat = new Chat({
      name: name,
      admin: userId,
      users: [userId],
    });

    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err);
  }
};

// Join existing chat.
exports.joinChat = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.payload;

    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    const chatWithUser = await Chat.findOne({ name: name }).and({
      users: { $in: userId },
    });

    if (chatWithUser) throw 'You are already added to this chat.';

    // Add user to chat and save in database.
    const chat = await Chat.findOne({ name: name });
    await chat.users.push(userId);
    await chat.save();

    res.json(chat);
  } catch (err) {
    console.error(err);
  }
};

// Leave existing chat.
exports.leaveChat = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.payload;

    // Check if chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    // Check if chat has user
    const chatWithUser = await Chat.findOne({ name: name }).and({
      users: { $in: userId },
    });

    if (!chatWithUser) throw 'You are not in this chat.';

    const userIsAdmin = chatWithUser.admin.toString() === userId.toString();

    if (userIsAdmin) throw 'You cannot leave the chat as admin.';

    await chatWithUser.updateOne({ $pull: { users: { $in: userId } } });
    await chatWithUser.save();

    res.json(chatWithUser.name);
  } catch (err) {
    console.error(err);
  }
};

// Clear chat of messages.
exports.clearChat = async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.payload;

    // Check if chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    // Check if user is admin
    const chatWithUserAsAdmin = await Chat.findOne({ name: name }).and({
      admin: userId,
    });

    if (!chatWithUserAsAdmin) throw 'Only admin can clear messages from chat.';

    const messagesInChat = await Message.find({
      chat: chatWithUserAsAdmin,
    });

    const messagesInChatIds = messagesInChat.map((message) => message._id);

    await chatWithUserAsAdmin.updateOne({
      $pull: { messages: { $in: messagesInChatIds } },
    });
    await Message.deleteMany({ chat: chatWithUserAsAdmin });

    res.json(chatWithUserAsAdmin.name);
  } catch (err) {
    console.error(err);
  }
};

// Add chat user.
exports.addChatUser = async (req, res) => {
  try {
    const { name, reqUser } = req.body;
    const userId = req.payload;

    // Check if chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    // Check if user is admin
    const chatWithUserAsAdmin = await Chat.findOne({ name: name }).and({
      admin: { $in: userId },
    });

    if (!chatWithUserAsAdmin) throw 'Only admin can add new users to chat.';

    const reqUserId = await User.findOne({ name: reqUser }).select('_id');
    const chatWithReqUser = await Chat.findOne({
      name: name,
      users: { $in: reqUserId },
    });

    if (chatWithReqUser) throw 'The user is already in this chat.';

    await chatWithUserAsAdmin.users.push(reqUserId);
    chatWithUserAsAdmin.save();

    res.json(chatWithUserAsAdmin.name);
  } catch (err) {
    console.error(err);
  }
};

// Remove chat user.
exports.removeChatUser = async (req, res) => {
  try {
    const { name, reqUser } = req.body;
    const userId = req.payload;

    // Check if chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    // Check if user is admin
    const chatWithUserAsAdmin = await Chat.findOne({ name: name }).and({
      admin: { $in: userId },
    });

    if (!chatWithUserAsAdmin) throw 'Only admin can remove users from chat.';

    const reqUserId = await User.findOne({ name: reqUser }).select('_id');
    const chatWithReqUser = await Chat.findOne({
      name: name,
      users: { $in: reqUserId },
    });

    if (!chatWithReqUser) throw 'The user is not in this chat.';

    await chatWithUserAsAdmin.updateOne({
      $pull: {
        users: {
          $in: [reqUserId._id],
        },
      },
    });
    res.json(chatWithUserAsAdmin.name);
  } catch (err) {
    console.error(err);
  }
};

// Make user admin.
exports.makeAdmin = async (req, res) => {
  try {
    const { name, reqUser } = req.body;
    const userId = req.payload;

    // Check if chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    // Check if user is admin
    const chatWithUserAsAdmin = await Chat.findOne({ name: name }).and({
      admin: { $in: userId },
    });

    if (!chatWithUserAsAdmin) throw 'Only admin can transfer admin rights.';

    const reqUserId = await User.findOne({ name: reqUser }).select('_id');
    const chatWithReqUser = await Chat.findOne({
      name: name,
      users: { $in: reqUserId },
    });

    if (!chatWithReqUser)
      throw 'The user must be added to the chat to be given admin rights.';

    await chatWithUserAsAdmin.updateOne({ admin: reqUserId });

    res.json(chatWithUserAsAdmin.name);
  } catch (err) {
    console.error(err);
  }
};

// Delete existing chat.
exports.deleteChat = async (req, res) => {
  try {
    const { name } = req.params;
    const userId = req.payload;

    // Check is chat and user exists in database by name.
    const chatExists = await Chat.findOne({ name: name });
    if (!chatExists) throw 'Chat does not exist.';
    const userExists = await User.findOne({ _id: userId });
    if (!userExists) throw 'User does not exist.';

    const chatWithAdmin = await Chat.findOne({ name: name }).and({
      admin: userId,
    });
    if (!chatWithAdmin) throw 'Only admin can delete the chat.';

    await Message.deleteMany({ chat: chatWithAdmin._id }).exec();

    await chatWithAdmin.delete();

    res.json({
      message: `${chatWithAdmin.name} was successfully deleted.`,
    });
  } catch (err) {
    console.error(err);
  }
};
