const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },

  topics: [
    {
      slug: {
        type: String,
        required: true,
        trim: true,
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      types: [
        {
          type: String,
          required: true,
          enum: ['lesson', 'exercise', 'test'],
        },
      ],
    },
  ],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
