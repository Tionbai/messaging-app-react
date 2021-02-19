const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required.',
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Users are required.',
        ref: 'User',
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

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
