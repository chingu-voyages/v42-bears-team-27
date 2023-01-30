const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  dueDate: Date,
  setAt: Date,
  tasks: [
    {
      type: {
        type: String,
        required: true,
        enum: ['lesson', 'exercise', 'test'],
      },
      subject: {
        type: String,
        required: true,
        trim: true,
      },
      topic: {
        type: String,
        required: true,
        trim: true,
      },
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
