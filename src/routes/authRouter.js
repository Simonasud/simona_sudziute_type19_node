// authRouter.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { register, login } = require('../controllers/authController');

// Nurodykite registracijos routa

router.post('/register', authController.register);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
