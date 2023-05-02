module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', {
      saleId: {
        type: Sequelize.INTEGER,
        field: 'sale_id',
        references: { model: 'sales', key: 'id' },
        primaryKey: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        references: { model: 'products', key: 'id' },
        primaryKey: true,
      },
      quantity: { type: Sequelize.INTEGER, allowNull: false },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales_products');
  },
};
