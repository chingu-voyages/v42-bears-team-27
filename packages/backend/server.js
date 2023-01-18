const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v0', routes);

// Database
mongoose.set('strictQuery', false);
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
