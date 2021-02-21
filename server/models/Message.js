const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      required: 'Chat is required.',
      ref: 'Chat',
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
