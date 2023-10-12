'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('UserFromMigrations', 'petName', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
        queryInterface.addColumn('UserFromMigrations', 'favoriteColor', {
          type: Sequelize.DataTypes.STRING,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('UserFromMigrations', 'petName', { transaction: t }),
        queryInterface.removeColumn('UserFromMigrations', 'favoriteColor', { transaction: t })
      ]);
    });
  }
};
