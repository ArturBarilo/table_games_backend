'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserFromMigrations');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('UserFromMigrations');
  }
};
