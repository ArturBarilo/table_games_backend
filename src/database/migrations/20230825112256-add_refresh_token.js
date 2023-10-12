'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 'refresh_token', {
      type: Sequelize.STRING,
      allowNull: true
    },)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'refresh_token')    
  }
};
