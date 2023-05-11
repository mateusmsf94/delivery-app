const express = require('express');
const saleController = require('../controllers/SaleController');

const saleRouter = express.Router();

saleRouter.post('/', saleController.createSale);
// saleRouter.get('/', saleController)
saleRouter.get('/:id', saleController.getSaleProductById);

module.exports = saleRouter;
