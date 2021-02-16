require('dotenv').config();
const app = require('./app.js');
const socket = require('socket.io');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const io = socket(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const { username } = socket.handshake.query;
  socket.join(username);

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
  });
});
