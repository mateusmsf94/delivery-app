const express = require('express');
const cors = require('cors');
const apiRoutes = require('../database/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.json());
app.use(cors()); // Add the CORS middleware

app.use(express.static('public'));
app.use(apiRoutes);

app.use((error, _req, res, _next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  res.status(500).json({ message: 'ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR' });
});

module.exports = app;
