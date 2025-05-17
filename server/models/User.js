const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  ageGroup: { type: String }, // если обязательное, добавим required: true
  phone: { type: String, required: true },
  country: { type: String },
  city: { type: String },
  experience: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  termsAccepted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  history: [{
    phone: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    updateAt: { type: Date, default: Date.now },
  }],
  paidCourses: {
    type: [String],
    default: []
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;