const express = require('express');
const cors = require('cors');
const { loginRouter, userRouter, productRouter, saleRouter } = require('../database/routes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.static('public'));

app.use('/login', loginRouter);
app.use('/register', userRouter);
app.use('/products', productRouter);
app.use('/sales', saleRouter);

app.use((error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: 'ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR' });
});

module.exports = app;
