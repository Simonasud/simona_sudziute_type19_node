// userRolesController.js
// controllers/userController.js

const { dbQueryWithData } = require('../helper');

async function createUser(req, res) {
  const { name, email, password, role } = req.body;

  const emailExists = await isEmailExists(email);
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is already in use' });
  }

  const sql =
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
  const [result, error] = await dbQueryWithData(sql, [
    name,
    email,
    password,
    role,
  ]);

  if (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to register user' });
  }

  res.json({ success: true, message: 'User registered successfully' });
}

async function isEmailExists(email) {
  const sql = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  const [result] = await dbQueryWithData(sql, [email]);
  return result[0].count > 0;
}

module.exports = { createUser };
