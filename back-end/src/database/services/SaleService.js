const { Sale } = require('../models');
const { validateToken } = require('../utils/jwt');

const createSale = async (token, data) => {
  validateToken(token);

  const saleCreated = await Sale.create({
    userId: data.userId,
    sellerId: data.sellerId,
    totalPrice: data.totalPrice,
    deliveryAddress: data.address,
    deliveryNumber: data.number,
  });

  console.log(saleCreated);
  return { statusCode: 201, data: { ...saleCreated.dataValues } };
};

const saleService = { createSale };
module.exports = saleService;