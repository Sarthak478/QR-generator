const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/dashboard', authMiddleware, qrController.dashboard);

router.get('/generate', authMiddleware, (req, res) => res.render('generate', { qrImage: null }));
router.post('/generate', authMiddleware, qrController.generateQR);

module.exports = router;
