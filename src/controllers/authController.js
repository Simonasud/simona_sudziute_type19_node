// authController.js
const { dbQueryWithData } = require('../helper');

async function register(req, res) {
  const { name, email, password } = req.body;

  // Your registration logic here
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  const [result, error] = await dbQueryWithData(sql, [name, email, password]);

  if (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  } else {
    res.json({
      success: true,
      message: 'User registered successfully',
      userId: result.insertId,
    });
  }
}

module.exports = { register };
