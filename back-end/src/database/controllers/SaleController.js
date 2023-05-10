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

const getSalesFromId = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, data } = await SaleService.getSalesFromId(id);
    return res.status(statusCode).json(data);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || 'Internal Server Error' });
  }
};

const saleController = { createSale, getSalesFromId };
module.exports = saleController;