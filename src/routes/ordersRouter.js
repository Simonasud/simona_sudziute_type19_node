// ordersRouter.js
const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orderController');

// nurodyti routa
router.post('/orders', ordersController.createOrder);
router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.get('/orders/user/:user_id', ordersController.getOrdersByUserId);

module.exports = router;
