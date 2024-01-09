// authController.js

// Importuojami moduliai
const { dbQueryWithData } = require('../helper');

// Funkcija tikrinti vartotojo prisijungimo duomenis
async function checkCredentials(email, password) {
  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  const [result, error] = await dbQueryWithData(sql, [email, password]);

  if (error) {
    console.error(error);
    return false;
  }
  return result.length > 0;
}

// Funkcija, kuri tvarko vartotojo registraciją
async function register(req, res) {
  const { name, email, password } = req.body;

  // registracijos logika čia
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

// prisijungimo logika čia

async function login(req, res) {
  const { email, password } = req.body;

  const isValid = await checkCredentials(email, password);

  if (isValid) {
    // Grąžinti sėkmingą atsakymą

    res.json({
      success: true,
      message: 'Login successful',
    });
  } else {
    // Grąžinti klaidos atsakymą dėl nepraeito prisijungimo

    res.status(401).json({
      success: false,
      message: 'Invalid email or password',
    });
  }
}

// Export
module.exports = { register, login };
