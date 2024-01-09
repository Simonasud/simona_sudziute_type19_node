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
  const sql = 'SELECT * FROM orders';
  const [orders, error] = await dbQueryWithData(sql);

  if (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to retrieve orders' });
  } else {
    res.json({ success: true, orders });
  }
}

module.exports = { createOrder, getAllOrders };
