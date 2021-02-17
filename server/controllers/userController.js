require('../models/User.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const nameRegex = /[a-zA-Z\s]*$/;
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!nameRegex.test(username))
    throw 'Username can only contain alphabetical letters.';
  if (!emailRegex.test(email))
    throw 'The email address provided is not supported.';
  if (password.length < 6) throw 'Password must be at least 6 characters long.';

  const usernameExists = await User.findOne({
    username,
  });
  const emailExists = await User.findOne({
    email,
  });

  if (usernameExists) throw `The username ${username} is already taken.`;
  if (emailExists) throw `There is already an account with ${email}. Login instead?`;

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
  const user = await User.findOne({
    username,
    password: sha256(password + process.env.SALT),
  });

  if (!user) throw 'Username and password did not match.';

  const token = jwt.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: 'User logged in successfully.',
    token,
  });
};
