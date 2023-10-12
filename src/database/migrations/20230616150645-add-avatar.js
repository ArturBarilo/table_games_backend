'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'avatar',
        {
          type: Sequelize.STRING,
          allowNull: true,
        })
    ])
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'avatar')
    ])    
  }
};
