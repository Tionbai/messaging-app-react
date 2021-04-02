require('../models/Chat.js');
const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');

// Get all chats the user is added to.
exports.getAllChats = async (req, res) => {
  const userId = req.payload;

  const chats = await Chat.find().where('users').in(userId);
  const populatedChats = [];
  await Promise.all(
    chats.map(async (chat) => {
      await chat
        .execPopulate('users', '_id username email')
        .then(async (result) => {
          await result.execPopulate('messages').then(async (result2) => {
            populatedChats.push(result2);
          });
        });
    }),
  );
  await res.json(populatedChats);
};

// Create new chat given a name and user(id).
exports.newChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  if (!name) throw new Error('Chat name must be provided.');

  const nameRegex = /^[a-zA-Z\s]*$/;

  if (!nameRegex.test(name))
    throw new Error('Chat name can only contain alphabetical letters.');

  const chatExists = await Chat.findOne({ name });
  if (chatExists) throw new Error('The chat name already exists.');

  const chat = new Chat({
    name,
    admin: userId,
    users: [userId],
  });

  await chat.save();

  res.json(chat);
};

// Create new chat given a name and user(id).
exports.newPrivateChat = async (req, res) => {
  const { name, contactId } = req.body;
  const userId = req.payload;

  if (!name) throw new Error('Chat name must be provided.');

  const nameRegex = /^[a-zA-Z\s]*$/;

  if (!nameRegex.test(name))
    throw new Error('Chat name can only contain alphabetical letters.');

  const user = await User.findById(userId);

  const chatExists = await Chat.findOne({ name });
  if (chatExists) throw new Error('The chat name already exists.');

  const userContact = await user.contacts.filter(
    (contact) => contactId === contact._id,
  );
  if (!userContact) throw new Error('The user is not in your contacts.');

  const chat = new Chat({
    name,
    admin: [userId, contactId],
    users: [userId, contactId],
    private: true,
  });

  await chat.save();

  res.json(chat);
};

// Join existing chat.
exports.joinChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  const chatWithUser = await Chat.findOne({ name }).and({
    users: { $in: userId },
  });

  if (chatWithUser) throw new Error('You are already added to this chat.');

  // Add user to chat and save in database.
  const chat = await Chat.findOne({ name });
  await chat.users.push(userId);
  await chat.save();

  res.json(chat);
};

// Leave existing chat.
exports.leaveChat = async (req, res) => {
  const { name } = req.body;
  const userId = req.payload;

  // Check if chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');
  const userExists = await User.findOne({ _id: userId });
  if (!userExists) throw new Error('User does not exist.');

  // Check if chat has user
  const chatWithUser = await Chat.findOne({ name }).and({
    users: { $in: userId },
  });

  if (!chatWithUser) throw new Error('You are not in this chat.');

  const userIsAdmin = chatWithUser.admin.toString() === userId.toString();

  if (userIsAdmin) throw new Error('You cannot leave the chat as admin.');

  await chatWithUser.updateOne({ $pull: { users: { $in: userId } } });
  await chatWithUser.save();

  res.json(chatWithUser.name);
};

// Clear chat of messages.
exports.clearChat = async (req, res) => {
  const { name } = req.params;
  const userId = req.payload;

  // Check if chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  // Check if user is admin
  const chatWithUserAsAdmin = await Chat.findOne({ name }).and({
    admin: userId,
  });

  if (!chatWithUserAsAdmin)
    throw new Error('Only admin can clear messages from chat.');

  const messagesInChat = await Message.find({
    chat: chatWithUserAsAdmin,
  });

  const messagesInChatIds = messagesInChat.map((message) => message._id);

  await chatWithUserAsAdmin.updateOne({
    $pull: { messages: { $in: messagesInChatIds } },
  });
  await Message.deleteMany({ chat: chatWithUserAsAdmin });

  res.json(chatWithUserAsAdmin.name);
};

// Add chat user.
exports.addChatUser = async (req, res) => {
  const { name, reqUser } = req.body;
  const userId = req.payload;

  // Check if chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  // Check if user is admin
  const chatWithUserAsAdmin = await Chat.findOne({ name }).and({
    admin: { $in: userId },
  });

  if (!chatWithUserAsAdmin)
    throw new Error('Only admin can add new users to chat.');

  const reqUserId = await User.findOne({ username: reqUser }).select('_id');
  const chatWithReqUser = await Chat.findOne({
    name,
    users: { $in: reqUserId },
  });

  if (chatWithReqUser) throw new Error('The user is already in this chat.');

  await chatWithUserAsAdmin.users.push(reqUserId);
  chatWithUserAsAdmin.save();

  res.json(chatWithUserAsAdmin.name);
};

// Remove chat user.
exports.removeChatUser = async (req, res) => {
  const { name, reqUser } = req.body;
  const userId = req.payload;

  // Check if chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  // Check if user is admin
  const chatWithUserAsAdmin = await Chat.findOne({ name }).and({
    admin: { $in: userId },
  });

  if (!chatWithUserAsAdmin)
    throw new Error('Only admin can remove users from chat.');

  const reqUserId = await User.findOne({ username: reqUser }).select('_id');
  const chatWithReqUser = await Chat.findOne({
    name,
    users: { $in: reqUserId },
  });

  if (!chatWithReqUser) throw new Error('The user is not in this chat.');

  await chatWithUserAsAdmin.updateOne({
    $pull: {
      users: {
        $in: [reqUserId._id],
      },
    },
  });
  res.json(chatWithUserAsAdmin.name);
};

// Make user admin.
exports.makeAdmin = async (req, res) => {
  const { name, reqUser } = req.body;
  const userId = req.payload;

  // Check if chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  // Check if user is admin
  const chatWithUserAsAdmin = await Chat.findOne({ name }).and({
    admin: { $in: userId },
  });

  if (!chatWithUserAsAdmin)
    throw new Error('Only admin can transfer admin rights.');

  const reqUserId = await User.findOne({ name: reqUser }).select('_id');
  const chatWithReqUser = await Chat.findOne({
    name,
    users: { $in: reqUserId },
  });

  if (!chatWithReqUser)
    throw new Error(
      'The user must be added to the chat to be given admin rights.',
    );

  await chatWithUserAsAdmin.updateOne({ admin: reqUserId });

  res.json(chatWithUserAsAdmin.name);
};

// Delete existing chat.
exports.deleteChat = async (req, res) => {
  const { name } = req.params;
  const userId = req.payload;

  // Check is chat and user exists in database by name.
  const chatExists = await Chat.findOne({ name });
  if (!chatExists) throw new Error('Chat does not exist.');

  const chatWithAdmin = await Chat.findOne({ name }).and({
    admin: userId,
  });
  if (!chatWithAdmin) throw new Error('Only admin can delete the chat.');

  await Message.deleteMany({ chat: chatWithAdmin._id }).exec();

  await chatWithAdmin.delete();

  res.json({
    message: `${chatWithAdmin.name} was successfully deleted.`,
  });
};
