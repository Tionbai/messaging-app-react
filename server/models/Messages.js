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
  sender: {
    type: String,
    required: true,
  },
  recipients: {
    type: Array,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('Messages', messageSchema);

module.exports = Message;
