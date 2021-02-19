const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectID,
    required: 'Chatroom is required.',
    ref: 'Chatroom',
  },
  sender: {
    type: mongoose.Schema.Types.ObjectID,
    required: 'Sender is required.',
    ref: 'User',
  },
  message: {
    type: String,
    required: 'Message is required.',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
