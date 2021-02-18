const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectID,
    required: 'Chatroom is required.',
    ref: 'Chatroom',
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    required: 'User is required.',
    ref: 'User',
  },
  text: {
    type: String,
    required: 'Text is required.',
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
