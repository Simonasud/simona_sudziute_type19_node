// authRouter.js
const express = require('express');

const router = express.Router();
const { validateFields } = require('../middleware');

const authController = require('../controllers/authController');

const requiredFieldsForRegister = ['name', 'email', 'password', 'role_id'];

// Registration route
router.post(
  '/register',
  validateFields(requiredFieldsForRegister),
  authController.register
);

// Login route
router.post('/login', authController.login);

module.exports = router;
