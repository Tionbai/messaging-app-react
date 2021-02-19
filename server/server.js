require('dotenv').config();
const mongoose = require('mongoose');
// Bring in all the models
const Chatroom = require('./models/Chatroom.js');
const User = require('./models/User.js');
const Message = require('./models/Message.js');
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

io.use(async (socket, next) => {
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
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        sender: user._id,
        message: message,
      });
      await newMessage.save();
      socket.emit('receive-message', {
        chatroom: chatroomId,
        sender: user._id,
        message: message,
      });
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

mongoose.connection.once('open', async () => {
  console.log('MongoDB connected.');

  // const message = await Message.find({ chatroom: '602c00106d051637a82fa497' });
  // console.log(message);
});
