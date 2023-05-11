const { Sale, SaleProduct } = require('../models');
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

  if (saleCreated) {
    const productsIdQty = Object.entries(data.qty);
    productsIdQty.map(async ([id, quantity]) => {
      if (quantity !== 0) {
        await SaleProduct.create({ saleId: saleCreated.id, productId: id, quantity });
      }
    });
  }

  return { statusCode: 201, data: { ...saleCreated.dataValues } };
};

const getSaleById = async (id) => {
  const data = await SaleProduct.findByPk(id);

  return { status: 200, message: data };
};

const saleService = { createSale, getSaleById };
module.exports = saleService;