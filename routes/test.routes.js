const express = require('express');
const router = express.Router();
const testController = require('../controllers/test.controller');

// Test natijalarini saqlash
router.post('/submit-test', testController.submitTest);

module.exports = router; 