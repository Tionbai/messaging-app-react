const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chatroom: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'Chatroom is required.',
      ref: 'Chatroom',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'Sender is required.',
      ref: 'User',
    },
    message: {
      type: String,
      required: 'Message is required.',
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
