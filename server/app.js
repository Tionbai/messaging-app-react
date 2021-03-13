const express = require('express');
const cors = require('cors');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Bring in the routes
app.use('/chat', require('./routes/chat.js'));
app.use('/user', require('./routes/user.js'));
app.use('/message', require('./routes/message.js'));

// Set up error handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseError);
if (process.env.ENV === 'DEVELOPMENT') {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;
