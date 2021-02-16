require('../models/User.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const sha256 = require('js-sha256');
const jsonwebtoken = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);

  const nameRegex = /[a-zA-Z\s]*$/;
  if (!nameRegex.test(username))
    throw 'Username can only contain alphabetical letters.';
  if (password.length < 6) throw 'Password must be at least 6 characters long.';

  const userExists = await User.findOne({
    username,
  });

  if (userExists) throw `The username ${username} is already taken.`;

  const user = new User({
    username,
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

  const token = jsonwebtoken.sign({ id: user.id }, process.env.SECRET);

  res.json({
    message: 'User logged in successfully.',
    token,
  });
};
