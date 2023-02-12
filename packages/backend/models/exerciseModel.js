const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  },
  content: {
    pages: [
      {
        questions: [
          {
            prompt: {
              type: String,
              required: true,
              trim: true,
            },
            answer: {
              type: String,
              required: true,
              trim: true,
            },
          },
        ],
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
