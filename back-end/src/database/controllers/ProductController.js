const productService = require('../services/productService');

const getAll = async (req, res, next) => {
  try {
    const data = await productService.getAll();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await productService.getProductById(id);

    return res.status(data.status).json(data.message);
  } catch (error) {
    next(error);
  }
};

const productController = { getAll, getProductById };

module.exports = productController;
