const express = require('express');
const saleController = require('../controllers/SaleController');

const saleRouter = express.Router();

saleRouter.get('/:id', saleController.getSalesFromId);
saleRouter.post('/', saleController.createSale);

module.exports = saleRouter;
