require('dotenv').config();
const mongoose = require('mongoose');
// Bring in all the models
const Chatroom = require('./models/Chatroom.js');
const User = require('./models/User.js');
const Messages = require('./models/Messages.js');
const app = require('./app.js');
const socket = require('socket.io');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const io = socket(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.use((socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id;
    next();
  } catch (err) {
    console.log(err);
  }
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.userId}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.userId}`);
  });

  socket.on('send-message', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ id: socket.userId });
      const message = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message: message,
      });
      io.to(chatroomId).emit('receive-message', {
        message,
        username: user.username,
        userId: socket.userId,
      });

      await message.save();
    }
  });
});

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

// const io = socket(5000, {
//   cors: {
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST'],
//   },
// });

// io.on('connection', (socket) => {
//   const { username } = socket.handshake.query;
//   socket.join(username);

// Message.find().then((result) => {
//   socket.emit('output-messages', result);
// });

// socket.on('send-message', ({ recipients, text }) => {
//   recipients.forEach((recipient) => {
//     const newRecipients = recipients.filter((r) => r !== recipient);
//     newRecipients.push(username);
//     socket.broadcast.to(recipient).emit('receive-message', {
//       recipients: newRecipients,
//       sender: username,
//       text,
//     });
//   });
// const message = new Message({
//   recipients: recipients,
//   sender: username,
//   text: text,
// });
// message.save();
//   });
// });
