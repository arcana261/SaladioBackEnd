'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('SavedSaladComponents', 'SavedSaladId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'SavedSaladComponents', 'SavedSaladId', 'SavedSalads', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'SavedSaladComponents', 'SavedSaladId', 'SavedSalads', 'id');
      yield queryInterface.removeColumn('SavedSaladComponents', 'SavedSaladId');
    });
  }
};
