'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('Orders', 'SaladId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'Orders', 'SaladId', 'Salads', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'Orders', 'SaladId', 'Salads', 'id');
      yield queryInterface.removeColumn('Orders', 'SaladId');
    });
  }
};
