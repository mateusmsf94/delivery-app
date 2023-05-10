const { Sale } = require('../models');
const { validateToken } = require('../utils/jwt');

const createSale = async (data, token) => {
  validateToken(token);

  const saleCreated = await Sale.create({
    userId: data.userId,
    sellerId: data.sellerId,
    totalPrice: data.totalPrice,
    deliveryAddress: data.address,
    deliveryNumber: data.number,
  });

  return { statusCode: 201, data: { ...saleCreated.dataValues } };
};

const saleService = { createSale };
module.exports = saleService;