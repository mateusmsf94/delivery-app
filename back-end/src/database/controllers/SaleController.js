const { SaleService } = require('../services');

const createSale = async (req, res) => {
  try {
    const { token, saleData } = req.body;
    const { statusCode, data } = await SaleService.createSale(token, saleData);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || 'Internal Server Error' });
  }
};

const saleController = { createSale };
module.exports = saleController;