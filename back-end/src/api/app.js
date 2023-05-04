const express = require('express');
const loginRouter = require('../database/routes');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.get('/login', loginRouter);

app.use(express.json());

module.exports = app;
