const { Product } = require('../models');

const getAll = async () => {
  const data = await Product.findAll();

  return data;
};

const getProductById = async (id) => {
  const data = await Product.findByPk(id);

  return { status: 200, message: data };
};

const productService = { getAll, getProductById };

module.exports = productService;
