// shopItemsController.js
const { dbQueryWithData } = require('../helper');

async function createShopItem(req, res) {
  const {
    name, price, description, image, item_type_id,
  } = req.body;

  const sql = 'INSERT INTO shop_items (name, price, description, image, item_type_id) VALUES (?, ?, ?, ?, ?)';
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

async function getShopItemById(req, res) {
  const itemId = req.params.id;

  const sql = 'SELECT * FROM shop_items WHERE id = ?';
  const [result, error] = await dbQueryWithData(sql, [itemId]);

  if (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to fetch shop item' });
  } else if (result.length === 0) {
    res.status(404).json({ success: false, message: 'Shop item not found' });
  } else {
    res.json({ success: true, shopItem: result[0] });
  }
}

async function deleteShopItemById(req, res) {
  const { id } = req.params;

  const sql = 'DELETE FROM shop_items WHERE id = ?';
  const [result, error] = await dbQueryWithData(sql, [id]);

  if (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to delete shop item' });
  } else if (result.affectedRows > 0) {
    res.json({ success: true, message: 'Shop item deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Shop item not found' });
  }
}
module.exports = {
  createShopItem,
  getAllShopItems,
  getShopItemById,
  deleteShopItemById,
};
