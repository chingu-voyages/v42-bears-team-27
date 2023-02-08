const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
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
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
