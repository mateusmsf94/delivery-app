const { Product } = require('../models');

const getAll = async () => {
  const data = await Product.findAll();

  return data;
};

const productService = { getAll };

module.exports = productService;
