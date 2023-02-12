/* eslint func-names: 0 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const TeacherSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
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
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
    },
    socketID: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

TeacherSchema.statics.hashPassword = (password) =>
  bcrypt.hashSync(password, 10);

TeacherSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('Teacher', TeacherSchema);
