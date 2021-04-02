require('../models/User.js');
const mongoose = require('mongoose');

const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

// Create array of error messages based on error(s).
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const nameRegex = /^[a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  const errorMessages = [];

  if (!nameRegex.test(username))
    errorMessages.push({
      type: 'error-username',
      message: 'Username can only contain alphabetical letters.',
    });
  if (!emailRegex.test(email))
    errorMessages.push({
      type: 'error-email',
      message: 'The email address provided is not supported.',
    });
  if (password.length < 6)
    errorMessages.push({
      type: 'error-password',
      message: 'Password must be at least 6 characters long.',
    });

  const userExists = await User.findOne({
    username,
  });
  const emailExists = await User.findOne({
    email,
  });

  if (userExists)
    errorMessages.push({
      type: 'error-username',
      message: `The username ${username} is already taken.`,
    });

  if (emailExists)
    errorMessages.push({
      type: 'error-email',
      message: `There is already an account with ${email}. Login instead?`,
    });

  const newErrorMessages = [...new Set(errorMessages)];

  if (newErrorMessages.length) throw newErrorMessages;

  const user = new User({
    username,
    email,
    password: sha256(password + process.env.SALT),
  });

  await user.save();

  res.json({
    message: `User ${username} registered successfully.`,
  });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({
    username,
  });

  if (!userExists) throw new Error(`Username ${username} does not exist.`);

  const user = await User.findOne({
    username,
    password: sha256(password + process.env.SALT),
  }).select('_id username email contacts');

  if (userExists && !user) throw new Error('The password is incorrect.');

  // ID is Mongoose document's _id. Set user token to id and secret.
  const token = jwt.sign({ id: user.id }, process.env.SECRET);

  await user.execPopulate('contacts').then((result) => {
    res.json({
      message: 'User logged in successfully.',
      token,
      user: result,
    });
  });
};

exports.getUser = async (req, res) => {
  const userId = req.payload;

  const user = await User.findOne({
    _id: userId,
  }).select('_id username email contacts');

  await user.execPopulate('contacts', '_id username email').then((result) => {
    res.json(result);
  });
};

// Delete user account from database
exports.delete = async (req, res) => {
  const userId = req.payload;
  const { ref } = req.params;
  const { password } = req.body;

  // Check if user is found in database by username or email ref.
  const userExists = await User.findOne({
    $or: [{ username: ref }, { email: ref }],
  });

  if (!userExists) {
    if (ref.includes('@')) {
      throw new Error('Wrong email');
    } else {
      throw new Error('Wrong username');
    }
  }

  // Check if password provided is correct.
  const validCredentials = await User.findOne({
    $or: [{ username: ref }, { email: ref }],
    password: sha256(password + process.env.SALT),
  });

  if (userExists && !validCredentials)
    throw new Error('The password is incorrect.');

  // Find all chats where user is user.
  const chatsWithUser = await Chat.find({
    users: { $in: validCredentials._id },
  });
  // Find all chats where user is admin.
  const chatswithUserAsAdmin = await Chat.find({
    admin: validCredentials._id,
  });

  // If user is admin in chat(s), transfer admin rights if users length > 1, else delete chat.
  chatswithUserAsAdmin.forEach(async (chat) => {
    if (chat.users.length > 0) {
      // Find chat users besides the admin
      const chatUsers = await chat.users.filter(
        (user) => user.toString() !== validCredentials._id.toString(),
      );
      // Transfer admin rights to another user.
      await chat.updateOne({ admin: chatUsers[0] });
      // Delete chat if no other users.
    } else {
      chat.delete();
    }
  });

  // Find all messages sent by user.
  const messagesByUser = await Message.find({ sender: validCredentials._id });

  // Remove user and user messages from all chats they are added to.
  chatsWithUser.forEach(async (chat) => {
    // Remove user refs as..
    await chat.updateOne({
      $pull: { users: { $in: [validCredentials._id] } },
    });
    messagesByUser.forEach(async (message) => {
      // Remove messages ref.
      await chat.updateOne({
        $pull: { messages: { $in: [message._id] } },
      });
    });
  });

  // Delete all messages sent from user.
  await Message.deleteMany({ sender: validCredentials._id });

  // Delete user.
  await userExists.delete();

  res.json(userId);
};

// Ref in req.body is either username or email
exports.newContact = async (req, res) => {
  const userId = req.payload;
  const { ref } = req.body;

  const user = await User.findById(userId);

  // Find user in database by either username or email.
  const contactToAdd = await User.findOne().or([
    { username: ref },
    { email: ref },
  ]);

  if (!contactToAdd) throw new Error('User does not exist.');

  // Check if the user is attempting to add themselves to contacts. Throw error if true.
  const theUserIsYou = userId.toString() === contactToAdd._id.toString();

  if (theUserIsYou) throw new Error('You cannot add yourself to contacts.');

  // Check if the user is already in contacts. Throw error if true.
  const userAlreadyInContacts = await User.find(user).and({
    contacts: { $in: contactToAdd._id },
  });

  if (userAlreadyInContacts.length)
    throw new Error('The user is already in your contacts.');

  // Save user to contacts and save in database.
  await user.contacts.push(contactToAdd._id);
  await user.save();

  res.json(contactToAdd);
};

// Ref in req.params is either username or email
exports.deleteContact = async (req, res) => {
  const userId = req.payload;
  const { ref } = req.params;

  const user = await User.findById(userId);

  // Find user in database by either username or email.
  const contactToDelete = await User.findOne().or([
    { username: ref },
    { email: ref },
  ]);

  if (!contactToDelete) throw new Error('User does not exist.');

  const theUserIsYou = userId.toString() === contactToDelete._id.toString();

  if (theUserIsYou) throw new Error('You are not a contact.');

  const userAlreadyInContacts = await User.find(user).and({
    contacts: { $in: contactToDelete._id },
  });

  if (!userAlreadyInContacts.length)
    throw new Error('The user is not in your contacts.');

  // Delete user from contacts and save in database.
  await user.updateOne({ $pull: { contacts: { $in: [contactToDelete._id] } } });
  // await user.save();

  res.json(contactToDelete._id);
};
