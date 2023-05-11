const { SaleService } = require('../services');
const saleService = require('../services/SaleService');

const createSale = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { statusCode, data } = await SaleService.createSale(req.body, authorization);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || 'Internal Server Error' });
  }
};

const getSaleProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await SaleService.getSaleProductById(id);

    return res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

const getSaleById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await saleService.getSalesById(id);

    return res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
}

const saleController = { createSale, getSaleProductById, getSaleById };
module.exports = saleController;