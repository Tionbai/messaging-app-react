const express = require('express');
const cors = require('cors');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Bring in the routes
app.use('/user', require('./routes/user.js'));
app.use('/chatroom', require('./routes/chatroom.js'));

// Setup error handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongooseError);
if (process.env.ENV === 'DEVELOPMENT') {
  app.use(errorHandlers.developmentErrors);
} else {
  app.use(errorHandlers.productionErrors);
}

module.exports = app;