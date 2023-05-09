const { Sale } = require('../models');
const { validateToken } = require('../utils/jwt');

const createSale = async (token, data) => {
  validateToken(token);

  const saleCreated = Sale.create({
    userId: data.userId,
    sellerId: data.sellerId,
    totalPrice: data.totalPrice,
    deliveryAddress: data.address,
    deliveryNumber: data.number,
    saleDate: new Date(),
    status: 'Pendente',
  });

  return { statusCode: 201, data: { ...saleCreated.dataValues } };
};

const saleService = { createSale };
module.exports = saleService;