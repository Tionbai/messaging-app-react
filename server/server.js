require('dotenv').config();
const ioRequire = require('socket.io');
const jwt = require('jsonwebtoken');
// Bring in all the models
const mongoose = require('mongoose');
const Chat = require('./models/Chat.js');
const User = require('./models/User.js');
const Message = require('./models/Message.js');

const app = require('./app.js');

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const io = ioRequire(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.use(async (socket, next) => {
  try {
    const currentSocket = socket;
    const { token } = currentSocket.handshake.query;
    const payload = jwt.verify(token, process.env.SECRET);
    currentSocket.userId = payload.id;
    currentSocket.join(currentSocket.userId);
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

  socket.on('send-message', async ({ chatId, message }) => {
    if (message.trim().length > 0) {
      const chat = await Chat.findById(chatId);
      const user = await User.findById(socket.userId);

      chat.users.forEach((chatUser) => {
        io.to(chatUser._id.toString()).emit('receive-message', {
          chat: chatId,
          sender: user._id.toString(),
          message,
        });
      });

      const newMessage = new Message({
        chat: chatId,
        sender: user._id,
        message,
      });

      await newMessage.save();

      await chat.messages.push(newMessage._id);

      await chat.save();
    }
  });
});

// const mongoDB = process.env.DATABASE_URL;

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.once('open', async () => {
  console.log('MongoDB connected.');
});
