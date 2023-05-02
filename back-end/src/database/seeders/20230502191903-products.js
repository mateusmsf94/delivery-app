const { products } = require('./db-data');

module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bullkInsert('users', products, { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('products');
  },
};
