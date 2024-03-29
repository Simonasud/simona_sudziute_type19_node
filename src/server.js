require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const authRouter = require('./routes/authRouter');
const shopItemsRouter = require('./routes/shopItemsRouter');
const ordersRouter = require('./routes/ordersRouter');
const userRolesRouter = require('./routes/userRolesRouter');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json('Hello World');
});

app.use('/api/auth', authRouter);
app.use('/api/shop', shopItemsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/user-roles', userRolesRouter);

// 404 - returns json
app.use((req, res) => {
  res.status(404).json({
    msg: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
