const { users } = require('./db-data');

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bullkInsert('users', users, { timestamps: false });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
