// ordersController.js
const { dbQueryWithData } = require('../helper');

async function createOrder(req, res) {
  const { user_id, shop_item_id, quantity, total_price, status } = req.body;

  const sql =
    'INSERT INTO orders (user_id, shop_item_id, quantity, total_price, status) VALUES (?, ?, ?, ?, ?)';
  const [result, error] = await dbQueryWithData(sql, [
    user_id,
    shop_item_id,
    quantity,
    total_price,
    status,
  ]);

  if (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  } else {
    res.json({
      success: true,
      message: 'Order created successfully',
      orderId: result.insertId,
    });
  }
}

async function getAllOrders(req, res) {
  const sql = `
    SELECT 
      orders.*, 
      users.name AS user_name, 
      shop_items.name AS item_name, 
      shop_items.price AS unit_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN shop_items ON orders.shop_item_id = shop_items.id
  `;

  const [orders, error] = await dbQueryWithData(sql);

  if (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  } else {
    res.json({ success: true, orders });
  }
}

async function getOrderById(req, res) {
  const orderId = req.params.id;

  const sql = 'SELECT * FROM orders WHERE id = ?';
  const [order, error] = await dbQueryWithData(sql, [orderId]);

  if (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch order' });
  } else if (order.length === 0) {
    res.status(404).json({ success: false, message: 'Order not found' });
  } else {
    res.json({ success: true, order: order[0] });
  }
}

async function getOrdersByUserId(req, res) {
  const userId = req.params.user_id;

  const sql = `
    SELECT orders.*, users.name AS user_name, shop_items.name AS item_name, shop_items.price AS item_price
    FROM orders
    JOIN users ON orders.user_id = users.id
    JOIN shop_items ON orders.shop_item_id = shop_items.id
    WHERE users.id = ?
  `;

  const [orders, error] = await dbQueryWithData(sql, [userId]);

  if (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch orders' });
  } else {
    res.json({ success: true, orders });
  }
}

module.exports = { createOrder, getAllOrders, getOrderById, getOrdersByUserId };
