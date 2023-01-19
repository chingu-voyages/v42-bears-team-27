const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const StudentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    classroom: { type: mongoose.ObjectId, required: true },
  },
  {
    timestamps: true,
  },
);

StudentSchema.statics.hashPassword = (password) =>
  bcrypt.hashSync(password, 10);

StudentSchema.methods.validatePassword = (password) =>
  bcrypt.compareSync(password, this.password);

module.exports = mongoose.model('Student', StudentSchema);
