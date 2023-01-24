const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    /**
     *  For messages sent to individual students, isBroadcast will be fase
     *  and toStudent will be a foreign key to a student
     */
    isBroadcast: {
      type: Boolean,
      required: true,
    },
    fromTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true,
    },
    toStudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
    },
    messageHeader: {
      type: String,
      required: true,
      trim: true,
    },
    messageBody: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Message = mongoose.model('Classroom', messageSchema);

module.exports = Message;
