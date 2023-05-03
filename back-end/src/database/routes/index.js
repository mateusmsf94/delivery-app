const express = require('express');
const { UserController } = require('../controllers')

const apiRoutes = express.Router();

apiRoutes.get('/email', UserController.getUserByEmail);

module.exports = apiRoutes;