const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
    {
        type:['lesson','exercise', 'test'],
        
        subject: {
          type: String,
          trim: true,
        },
        topic: {
            type: String,
            trim: true,
          },
          sourceUrl: {
            type: String, 
            trim: true,
          },
           
        
        
          
          
      }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
