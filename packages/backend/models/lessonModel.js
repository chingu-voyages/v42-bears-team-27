const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
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

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
