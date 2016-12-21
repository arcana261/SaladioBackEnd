'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('SavedSalads', 'dummy');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('SavedSalads', 'dummy', Sequelize.STRING);
  }
};
