'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('SavedSalads', 'UserId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'SavedSalads', 'UserId', 'Users', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'SavedSalads', 'UserId', 'Users', 'id');
      yield queryInterface.removeColumn('SavedSalads', 'UserId');
    });
  }
};
