const express = require('express');
const productController = require('../controllers/ProductController');
const userController = require('../controllers/UserController');

const productRouter = express.Router();

productRouter.get('/sellers', userController.getSellersData);
productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getProductById);

module.exports = productRouter;
