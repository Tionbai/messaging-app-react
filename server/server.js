require('dotenv').config();
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
// Bring in all the models
const mongoose = require('mongoose');
const Chat = require('./models/Chat.js');
const User = require('./models/User.js');
const Message = require('./models/Message.js');

const app = require('./app.js');

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
    socket.join(socket.userId);
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
      const chat = await Chat.findOne({ _id: chatId });
      const user = await User.findOne({ _id: socket.userId });

      chat.users.forEach((user) => {
        io.to(user._id.toString()).emit('receive-message', {
          chat: chatId,
          sender: user._id.toString(),
          message: message,
        });
      });

      const newMessage = new Message({
        chat: chatId,
        sender: user._id,
        message: message,
      });
      await newMessage.save();

      const updateDatabaseOnNewMessage = async (chatId, messageId) => {
        const chat = await Chat.findOne({ _id: chatId });
        
        await chat.messages.push(messageId);
        
        await chat.save();
      };
      await updateDatabaseOnNewMessage(chatId, newMessage._id);
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
});
