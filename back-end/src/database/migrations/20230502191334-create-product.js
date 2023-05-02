module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      price: { type: Sequelize.DECIMAL(4, 2), allowNull: false },
      urlImage: { type: Sequelize.STRING, field: 'url_image', defaultValue: '' },
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('products');
  },
};
