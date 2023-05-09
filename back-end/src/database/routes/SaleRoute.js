const express = require('express');
const saleController = require('../controllers/SaleController');

const saleRouter = express.Router();

saleRouter.post('/', saleController.createSale);

module.exports = saleRouter;
