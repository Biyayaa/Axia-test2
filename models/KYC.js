const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  documentType: String,
  documentNumber: String,
  verified: { type: Boolean, default: false }
});

const KYC = mongoose.model('KYC', kycSchema);
module.exports = KYC;