require('../models/User.js');
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const User = mongoose.model('User');
const Message = mongoose.model('Message');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

// Create array of error messages based on error(s).
exports.register = async (req, res) => {
  try {
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
  } catch (err) {
    throw err;
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await User.findOne({
      username,
    });

    if (!userExists) throw `Username ${username} does not exist.`;

    const user = await User.findOne({
      username,
      password: sha256(password + process.env.SALT),
    }).select('_id username email contacts');

    if (userExists && !user) throw 'The password is incorrect.';

    // ID is Mongoose document's _id. Set user token to id and secret.
    const token = jwt.sign({ id: user.id }, process.env.SECRET);

    await user.execPopulate('contacts').then((result) => {
      res.json({
        message: 'User logged in successfully.',
        token,
        user: result,
      });
    });
  } catch (err) {
    throw err;
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.payload;

    const user = await User.findOne({
      _id: userId,
    }).select('_id username email contacts');

    await user.execPopulate('contacts', '_id username email').then((result) => {
      res.json(result);
    });
  } catch (err) {
    throw err;
  }
};

// Delete user account from database
exports.delete = async (req, res) => {
  try {
    const userId = req.payload;
    const { ref } = req.params;
    const { password } = req.body;

    console.log(password);
    console.log(ref);

    // Check if user is found in database by username or email ref.
    const userExists = await User.findOne({
      $or: [{ username: ref }, { email: ref }],
    });

    if (!userExists) {
      if (ref.includes('@')) {
        throw 'Wrong email.';
      } else {
        throw 'Wrong username.';
      }
    }

    console.log(sha256(password + process.env.SALT));

    // Check if password provided is correct.
    const validCredentials = await User.findOne({
      $or: [{ username: ref }, { email: ref }],
      password: sha256(password + process.env.SALT),
    });

    if (userExists && !validCredentials) throw 'The password is incorrect.';

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
      try {
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
      } catch (err) {
        throw err;
      }
    });

    // Find all messages sent by user.
    const messagesByUser = await Message.find({ sender: validCredentials._id });

    // Remove user and user messages from all chats they are added to.
    chatsWithUser.forEach(async (chat) => {
      try {
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
      } catch (err) {
        throw err;
      }
    });

    // Delete all messages sent from user.
    await Message.deleteMany({ sender: validCredentials._id });

    // Delete user.
    await userExists.delete();

    res.json(userId);
  } catch (err) {
    throw err;
  }
};

// Ref in req.body is either username or email
exports.newContact = async (req, res) => {
  try {
    const userId = req.payload;
    const { ref } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) throw 'Only a registered user can add contacts.';

    // Find user in database by either username or email.
    const userExists = await User.findOne().or([
      { username: ref },
      { email: ref },
    ]);

    if (!userExists) throw 'User does not exist.';

    const theUserIsYou = userId.toString() === userExists._id.toString();

    if (theUserIsYou) throw 'You cannot add yourself to contacts.';

    const userAlreadyInContacts = await User.find(user).and({
      contacts: { $in: userExists._id },
    });

    if (userAlreadyInContacts.length)
      throw 'The user is already in your contacts.';

    // Save user to contacts and save in database.
    await user.contacts.push(userExists._id);
    await user.save();

    res.json(userExists);
  } catch (err) {
    throw err;
  }
};

// Ref in req.params is either username or email
exports.deleteContact = async (req, res) => {
  try {
    const userId = req.payload;
    const { ref } = req.params;

    const user = await User.findOne({ _id: userId });

    if (!user) throw 'Only a registered user can delete contacts.';

    // Find user in database by either username or email.
    const userExists = await User.findOne().or([
      { username: ref },
      { email: ref },
    ]);

    if (!userExists) throw 'User does not exist.';

    const theUserIsYou = userId.toString() === userExists._id.toString();

    if (theUserIsYou) throw 'You are not a contact.';

    const userAlreadyInContacts = await User.find(user).and({
      contacts: { $in: userExists._id },
    });

    if (!userAlreadyInContacts.length)
      throw 'The user is not in your contacts.';

    // Delete user from contacts and save in database.
    await user.updateOne({ $pull: { contacts: { $in: [userExists._id] } } });
    // await user.save();

    res.json(userExists._id);
  } catch (err) {
    throw err;
  }
};
