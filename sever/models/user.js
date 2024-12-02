const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  points: { type: Number, default: 100 },
  welcomeBonusGiven: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
