require('../models/User.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
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

  const usernameExists = await User.findOne({
    username,
  });
  const emailExists = await User.findOne({
    email,
  });

  if (usernameExists)
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

  const usernameExists = await User.findOne({
    username,
  });

  if (!usernameExists) throw `Username ${username} does not exist.`;

  const user = await User.findOne({
    username,
    password: sha256(password + process.env.SALT),
  });

  if (usernameExists && !user) throw 'The password is incorrect.';

  // ID is Mongoose document's _id. Set user token to id and secret.
  const token = jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: 'User logged in successfully.',
    token,
  });
};

// Ref in req.body is either username or email
exports.getContacts = async (req, res) => {
  const userId = req.payload;

  const user = await User.findOne({ _id: userId });

  if (!user) throw 'Only a registered user can have contacts.';

  // Populate user contacts and return contacts.
  await user.execPopulate('contacts').then((data) => res.json(data.contacts));
};

// Ref in req.body is either username or email
exports.newContact = async (req, res) => {
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
};
