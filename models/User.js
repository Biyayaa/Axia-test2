const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  kyc: { type: mongoose.Schema.Types.ObjectId, ref: 'KYC' }, // One-to-one
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] // One-to-many
});

const User = mongoose.model('User', userSchema);
module.exports = User;
