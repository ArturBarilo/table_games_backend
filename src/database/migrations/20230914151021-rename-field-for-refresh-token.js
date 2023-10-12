'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'refresh_token', { transaction: t }),
        queryInterface.addColumn('users', 'refreshToken',{type: Sequelize.STRING,
          allowNull: true}, { transaction: t }),

      ])
    })
    
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('users', 'refreshToken', { transaction: t }),
        queryInterface.removeColumn('users', 'refresh_token', { transaction: t }),
      ])
    })
  }
};
