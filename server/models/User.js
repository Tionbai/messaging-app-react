const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Name is required.',
    },
    email: {
      type: String,
      required: 'Email is required.',
    },
    password: {
      type: String,
      required: 'Password is required.',
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    chatrooms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chatroom',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
