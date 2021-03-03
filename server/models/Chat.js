const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: 'Name is required.',
    },
    admin: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Admin is required.',
      },
    ],
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: 'Users are required.',
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    private: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
