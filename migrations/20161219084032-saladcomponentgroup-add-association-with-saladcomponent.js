'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function*() {
      yield queryInterface.addColumn('SaladComponents', 'SaladComponentGroupId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'SaladComponents', 'SaladComponentGroupId', 'SaladComponentGroups', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function*() {
      yield sql.foreignKeyDown(queryInterface, 'SaladComponents', 'SaladComponentGroupId',
          'SaladComponentGroups', 'id');
      yield queryInterface.removeColumn('SaladComponents', 'SaladComponentGroupId');
    });
  }
};
