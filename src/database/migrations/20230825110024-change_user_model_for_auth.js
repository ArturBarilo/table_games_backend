'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 'activationLink', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'activationLink')    
  }
};
