/* eslint no-console: 0 */
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

const app = express();

// Database
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('database connected!');
  })
  .catch((err) => {
    console.log(err);
  });

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
app.use(cors(corsOptions()));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SIGN_COOKIE_KEY));
app.use(passport.initialize());

app.use('/api/v0', routes);

// Error handlers
app.use((_, res) => {
  res.status(404).json({ message: '404, endpoint not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
