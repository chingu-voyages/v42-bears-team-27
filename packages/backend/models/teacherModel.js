const mongoose = require('mongoose');

const { Schema } = mongoose;

const TeacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
});

const Teacher = mongoose.model('Teacher', TeacherSchema);

module.exports = { Teacher };
