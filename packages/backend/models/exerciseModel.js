const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
  },
  title: String,
  content: {
    pages: [
      {
        text: String,
      },
    ],
  },
  points: {
    type: Number,
    default: 1,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
