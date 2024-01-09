// ordersRouter.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

// nurodyti routa
router.post('/orders', ordersController.createOrder);
router.get('/orders', ordersController.getAllOrders);

module.exports = router;
