'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('UserRoles', 'UserId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'UserRoles', 'UserId', 'Users', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'UserRoles', 'UserId', 'Users', 'id');
      yield queryInterface.removeColumn('UserRoles', 'UserId');
    });
  }
};
