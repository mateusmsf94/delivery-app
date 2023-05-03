const express = require('express');
const productController = require('../controllers/ProductController');

const productRouter = express.Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getProductById);

module.exports = productRouter;
