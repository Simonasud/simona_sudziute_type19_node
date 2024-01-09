// authController.js
const { dbQueryWithData } = require('../helper');

async function register(req, res) {
  const { name, email, password, role_id } = req.body;

  const emailExists = await isEmailTaken(email);
  if (emailExists) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is already taken' });
  }

  const sql =
    'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
  const [result, error] = await dbQueryWithData(sql, [
    name,
    email,
    password,
    role_id,
  ]);

  if (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: 'Failed to register user' });
  }

  res.json({ success: true, message: 'User registered successfully' });
}

async function isEmailTaken(email) {
  const sql = 'SELECT * FROM users WHERE email = ?';
  const [result, error] = await dbQueryWithData(sql, [email]);

  if (error) {
    console.error(error);
    return true;
  }

  return result.length > 0;
}

module.exports = { register };
