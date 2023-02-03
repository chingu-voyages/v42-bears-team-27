/* eslint no-console: 0 */
require('dotenv').config();
const { createServer } = require('http');
const cors = require('cors');
const express = require('express');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const corsOptions = () => {
  if (process.env.NODE_ENV === 'production') {
    return {
      origin: process.env.FRONTEND,
      credentials: true,
    };
  }
  return {
    origin: 'http://localhost:3000',
    credentials: true,
  };
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: corsOptions(),
});

app.locals.io = io;

// Database
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SIGN_COOKIE_KEY));
app.use(passport.initialize());

app.use('/api/v0', routes);

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, console.log(`server started on port ${PORT}`));
