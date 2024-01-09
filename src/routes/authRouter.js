// authRouter.js
const express = require('express');

const router = express.Router();
const { validateFields } = require('../middleware');
const authController = require('../controllers/authController');
const { register, login } = require('../controllers/authController');

const requiredFieldsForRegister = ['name', 'email', 'password', 'role_id'];

// registracijos routa
router.post(
  '/register',
  validateFields(requiredFieldsForRegister),
  authController.register,
);
router.post('/register', authController.register);
router.post('/register', register);
router.post('/login', login);

module.exports = router;
