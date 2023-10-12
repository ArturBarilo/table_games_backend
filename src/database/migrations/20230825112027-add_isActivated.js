'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'users', 'isActivated', {
      type: Sequelize.BOOLEAN,
      default: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'isActivated') 
  }
};
