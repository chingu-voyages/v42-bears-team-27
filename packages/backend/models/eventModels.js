const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
          trim: true,
        },
       
        created_date: Date,
        due_date: Date,
        task: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Task',
            },
          ],
          
      }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
