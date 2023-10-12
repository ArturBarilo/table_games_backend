'use strict';



module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'role', 
        {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'unauthorized',
        },
      ),
      
      
    ]);
  },

  down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'role'),
    ]);
  },
};
