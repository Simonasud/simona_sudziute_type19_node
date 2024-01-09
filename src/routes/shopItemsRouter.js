// shopItemsRouter.js
const express = require('express');
const router = express.Router();
const shopItemsController = require('../controllers/shopItemsController');

// Define the create shop item route
router.post('/shop_items', shopItemsController.createShopItem);
router.get('/shop_items', shopItemsController.getAllShopItems);
router.get('/shop_items/:id', shopItemsController.getShopItemById);
router.delete('/shop_items/:id', shopItemsController.deleteShopItemById);

module.exports = router;
