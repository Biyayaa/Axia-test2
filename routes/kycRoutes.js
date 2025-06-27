const express = require('express');
const router = express.Router();
const kycController = require('../controllers/kycController');
const auth = require('../middleware/auth');

// Create KYC (POST)
router.post('/', auth, kycController.createKYC);

// Get KYC by user ID (GET)
router.get('/user/:userId', auth, kycController.getKYCByUser);

// Update KYC (PUT)
router.put('/:kycId', auth, kycController.updateKYC);

// Delete KYC (DELETE)
router.delete('/:kycId', auth, kycController.deleteKYC);

module.exports = router;