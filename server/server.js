require('dotenv').config();
const socket = require('socket.io');
const jwt = require('jsonwebtoken');
// Bring in all the models
const mongoose = require('mongoose');
const Chatroom = require('./models/Chatroom.js');
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

  socket.on('send-message', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const chatroom = await Chatroom.findOne({ _id: chatroomId });
      const user = await User.findOne({ _id: socket.userId });

      chatroom.users.forEach((user) => {
        io.to(user._id.toString()).emit('receive-message', {
          chatroom: chatroomId,
          sender: user._id.toString(),
          message: message,
        });
      });

      const newMessage = new Message({
        chatroom: chatroomId,
        sender: user._id.toString(),
        message: message,
      });
      await newMessage.save();

      // TODO: Start updating database when database is cleared and app is ready for prototype.
      const updateChatroom = async (chatroomId, userId, messageId) => {
        const chatroom = await Chatroom.findOne({ _id: chatroomId });
        const user = await User.findOne({ _id: userId });

        await chatroom.messages.push(messageId);
        await user.messages.push(messageId);

        await chatroom.save();
        await user.save();
      };
      // await updateChatroom(chatroomId, user._id, newMessage._id);
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
