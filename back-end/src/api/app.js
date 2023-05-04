const express = require('express');
const loginRouter = require('../database/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/login', loginRouter);

app.use(express.json());

app.use((error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: 'ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR' });
});

module.exports = app;
