'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('ClassicSalads', 'SaladId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'ClassicSalads', 'SaladId', 'Salads', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'ClassicSalads', 'SaladId', 'Salads', 'id');
      yield queryInterface.removeColumn('ClassicSalads', 'SaladId');
    });
  }
};
