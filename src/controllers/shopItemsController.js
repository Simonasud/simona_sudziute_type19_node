// shopItemsController.js
const { dbQueryWithData } = require('../helper');

async function createShopItem(req, res) {
  const { name, price, description, image, item_type_id } = req.body;

  const sql =
    'INSERT INTO shop_items (name, price, description, image, item_type_id) VALUES (?, ?, ?, ?, ?)';
  const [result, error] = await dbQueryWithData(sql, [
    name,
    price,
    description,
    image,
    item_type_id,
  ]);

  if (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to create shop item' });
  } else {
    res.json({
      success: true,
      message: 'Shop item created successfully',
      itemId: result.insertId,
    });
  }
}

async function getAllShopItems(req, res) {
  const sql = 'SELECT * FROM shop_items';
  const [results, error] = await dbQueryWithData(sql);

  if (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch shop items' });
  } else {
    res.json({
      success: true,
      message: 'Shop items fetched successfully',
      shopItems: results,
    });
  }
}

module.exports = { createShopItem, getAllShopItems };
