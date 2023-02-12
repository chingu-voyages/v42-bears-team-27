/* eslint func-names: 0 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema(
  {
    forename: {
      type: String,
      required: true,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    inbox: [
      {
        messageID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Message',
          required: true,
        },
        hasBeenRead: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    tasks: [
      {
        taskID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Task',
          required: true,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        timeSpent: {
          type: Number,
          default: 0,
        },
        event: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Event',
          required: true,
        },
      },
    ],
    socketID: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

StudentSchema.statics.hashPassword = (password) =>
  bcrypt.hashSync(password, 10);

StudentSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Student', StudentSchema);
