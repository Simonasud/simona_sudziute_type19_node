// userRolesController.js
const { dbQueryWithData } = require('../helper');

async function getAllUserRoles(req, res) {
  const sql = 'SELECT * FROM user_roles';

  try {
    const [roles, error] = await dbQueryWithData(sql);

    if (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: 'Failed to fetch user roles' });
    } else {
      res.json({ success: true, roles });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = { getAllUserRoles };
