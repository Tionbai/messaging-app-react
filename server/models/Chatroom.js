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
});

module.exports = mongoose.model('Chatroom', chatroomSchema);
