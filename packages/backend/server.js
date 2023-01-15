require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const studentRouter = require('./routes/studentRoutes');

const app = express();

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

app.use(cors()); // TODO options for production
app.use(express.json());

app.use('/student', studentRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server started on port ${PORT}`));
