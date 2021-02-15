const io = require('socket.io')(5000, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const socketSendMessage = (socket, id, { recipients, text }) => {
  recipients.forEach((recipient) => {
    const newRecipients = recipients.filter((r) => r !== recipient);
    newRecipients.push(id);
    socket.broadcast.to(recipient).emit('receive-message', {
      recipients: newRecipients,
      sender: id,
      text,
    });
  });
};

io.on('connection', (socket) => {
  const { id } = socket.handshake.query;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) =>
    socketSendMessage(socket, id, { recipients, text }),
  );
});
