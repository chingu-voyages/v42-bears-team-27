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

app.use(cors()); // TODO options for production
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.SIGN_COOKIE_KEY));
app.use(passport.initialize());

app.use('/api/v0', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
