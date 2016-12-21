'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function *() {
      yield queryInterface.addColumn('SavedSalads', 'SaladId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'SavedSalads', 'SaladId', 'Salads', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'SavedSalads', 'SaladId', 'Salads', 'id');
      yield queryInterface.removeColumn('SavedSalads', 'SaladId');
    });
  }
};
