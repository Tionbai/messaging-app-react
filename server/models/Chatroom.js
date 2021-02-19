const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is required.',
  },
  users: {
    type: Array,
    required: 'Users are required.',
  },
  messages: [{
    ref: 'Message',
    type: mongoose.Schema.Types.ObjectID,
  }]
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
