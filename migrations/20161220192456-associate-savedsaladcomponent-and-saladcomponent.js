'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('SavedSaladComponents', 'SaladComponentId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'SavedSaladComponents', 'SaladComponentId', 'SaladComponents', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'SavedSaladComponents', 'SaladComponentId', 'SaladComponents', 'id');
      yield queryInterface.removeColumn('SavedSaladComponents', 'SaladComponentId');
    });
  }
};
