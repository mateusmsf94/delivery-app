const express = require('express');
const saleController = require('../controllers/SaleController');

const saleRouter = express.Router();

saleRouter.get('/user/:id', saleController.getSalesFromUser);
saleRouter.get('/:id', saleController.getSalesById);
saleRouter.post('/', saleController.createSale);
saleRouter.get('/:id', saleController.getSaleById);
saleRouter.get('/product/:id', saleController.getSaleProductById);

module.exports = saleRouter;
