const { Sale, SaleProduct, User, Product } = require('../models');
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

const getSaleProductById = async (id) => {
  const data = await SaleProduct.findByPk(id);

  return { status: 200, message: data };
};

const getSalesById = async (saleId) => {
  const data = await Sale.findOne({
    where: { id: saleId },
    include: [
      { model: User, as: 'seller', attributes: ['id', 'name'] },
      { model: Product, as: 'product', attributes: ['id', 'name', 'price'] },
    ],
  });

  return { status: 200, message: data };
};

const saleService = { createSale, getSaleProductById, getSalesById };
module.exports = saleService;