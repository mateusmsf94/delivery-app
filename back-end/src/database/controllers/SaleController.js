const { SaleService } = require('../services');

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
    // if (!req.params) throw Object({ status: 404, message: 'body is missing' });

    const data = await SaleService.getSaleProductById(id);

    return res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

const saleController = { createSale, getSaleProductById };
module.exports = saleController;