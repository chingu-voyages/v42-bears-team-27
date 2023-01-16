const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const routes = require('./routes');

const app = express();
mongoose.set('strictQuery', false);

app.use(express.json());
app.use('/api/v0', routes);

// Database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('database connected...');
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
