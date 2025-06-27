const KYC = require('../models/KYC');
const User = require('../models/User');

// Create KYC
exports.createKYC = async (req, res) => {
  try {
    const { userId, documentType, documentNumber, verified } = req.body;

    // Check if KYC already exists for this user
    const existingKYC = await KYC.findOne({ user: userId });
    if (existingKYC) {
      return res.status(400).json({ message: 'KYC already exists for this user' });
    }

    const kyc = new KYC({ user: userId, documentType, documentNumber, verified });
    await kyc.save();

    // Link KYC to user
    await User.findByIdAndUpdate(userId, { kyc: kyc._id }, { new: true });

    res.status(201).json({ message: 'KYC created successfully', kyc });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get KYC by user ID
exports.getKYCByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const kyc = await KYC.findOne({ user: userId });
    if (!kyc) {
      return res.status(404).json({ message: 'KYC not found for this user' });
    }
    res.json(kyc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update KYC
exports.updateKYC = async (req, res) => {
  try {
    const { kycId } = req.params;
    const updatedKYC = await KYC.findByIdAndUpdate(kycId, req.body, { new: true });
    if (!updatedKYC) {
      return res.status(404).json({ message: 'KYC not found' });
    }
    res.json(updatedKYC);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete KYC
exports.deleteKYC = async (req, res) => {
  try {
    const { kycId } = req.params;
    const deletedKYC = await KYC.findByIdAndDelete(kycId);
    if (!deletedKYC) {
      return res.status(404).json({ message: 'KYC not found' });
    }
    // Optionally, remove reference from user
    await User.updateOne({ kyc: kycId }, { $unset: { kyc: "" } });
    res.json({ message: 'KYC deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};