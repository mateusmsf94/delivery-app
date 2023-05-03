const express = require('express');
const apiRoutes = require('../database/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());

app.use(express.json());
app.use(apiRoutes);

module.exports = app;
