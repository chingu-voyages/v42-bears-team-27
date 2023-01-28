const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  topics: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      types: [
        {
          title: {
            type: String,
            required: true,
            enum: ['lesson', 'exercise', 'test'],
          },

          url: {
            type: String,
            required: true,
            trim: true,
          },
        },
      ],
    },
  ],
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
