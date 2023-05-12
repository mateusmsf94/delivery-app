const { SaleService } = require('../services');
const saleService = require('../services/SaleService');

const ERROR_MESSAGE = 'Internal Server Error';

const createSale = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { statusCode, data } = await SaleService.createSale(req.body, authorization);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || ERROR_MESSAGE });
  }
};

const getSalesFromUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, data } = await SaleService.getSalesFromUser(id);
    return res.status(statusCode).json(data);
  } catch (error) {
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || ERROR_MESSAGE });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { statusCode, data } = await SaleService.getSalesById(id);
    return res.status(statusCode).json(data);
  } catch (error) {
    return res
    .status(error.statusCode || 500)
    .json({ message: error.message || ERROR_MESSAGE });
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
};

const saleController = {
  createSale, getSaleProductById, getSaleById, getSalesFromUser, getSalesById };
module.exports = saleController;