require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
 const cors = require('cors')
const error = require('./middleware/error');
 const teacherDahsboard = require('./routes/teacherDashboardRoutes');

require('dotenv').config();

const app = express();

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
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

app.use(error);

const PORT = process.env.PORT || 5000;

app.use('/classroom', teacherDahsboard);

app.listen(PORT, console.log(`server started on port ${PORT}`));
