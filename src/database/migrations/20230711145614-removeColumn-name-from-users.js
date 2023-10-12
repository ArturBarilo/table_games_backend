'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'name');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'name')
  }
};
