// ordersRouter.js
const express = require('express');

const router = express.Router();
const { validateFields } = require('../middleware');
const ordersController = require('../controllers/orderController');

const requiredFieldsForCreateOrder = [
  'user_id',
  'shop_item_id',
  'quantity',
  'total_price',
  'status',
];

// nurodyti routa
router.post(
  '/orders',
  validateFields(requiredFieldsForCreateOrder),
  ordersController.createOrder,
);
router.post('/orders', ordersController.createOrder);
router.get('/orders', ordersController.getAllOrders);
router.get('/orders/:id', ordersController.getOrderById);
router.get('/orders/user/:user_id', ordersController.getOrdersByUserId);

module.exports = router;
