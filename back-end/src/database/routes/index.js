const express = require('express');
const { UserController } = require('../controllers');
const productRouter = require('./productRouter');

const apiRoutes = express.Router();

apiRoutes.get('/email', UserController.getUserByEmail);
apiRoutes.use('/products', productRouter);

module.exports = apiRoutes;