const express = require('express');
const productController = require('../controllers/ProductController');

const productRouter = express.Router();

productRouter.get('/', productController.getAll);

module.exports = productRouter;
