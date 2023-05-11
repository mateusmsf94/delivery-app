const express = require('express');
const saleController = require('../controllers/SaleController');

const saleRouter = express.Router();

saleRouter.post('/', saleController.createSale);
saleRouter.get('/:id', saleController.getSaleById);

module.exports = saleRouter;
