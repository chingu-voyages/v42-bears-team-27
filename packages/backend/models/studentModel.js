/* eslint func-names: 0 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema(
  {
    fullName: {
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
      trim: true,
    },
    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Classroom',
      required: true,
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
