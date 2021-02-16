require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app.js');
// const Message = require('../models/messages');
const socket = require('socket.io');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

// const mongoDB = process.env.DATABASE_URL;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected.');
});

// Bring in all the models
require('./models/Chatroom.js');
require('./models/User.js');
require('./models/Messages.js');

const io = socket(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const { username } = socket.handshake.query;
  socket.join(username);

  Message.find().then((result) => {
    socket.emit('output-messages', result);
  });

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(username);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: username,
        text,
      });
    });
    const message = new Message({
      recipients: recipients,
      sender: username,
      text: text,
    });
    message.save();
  });
});
