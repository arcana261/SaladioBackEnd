'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('ClassicSalads', 'ClassicSaladCatagoryId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'ClassicSalads', 'ClassicSaladCatagoryId', 'ClassicSaladCatagories', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'ClassicSalads', 'ClassicSaladCatagoryId', 'ClassicSaladCatagories', 'id');
      yield queryInterface.removeColumn('ClassicSalads', 'ClassicSaladCatagoryId');
    });
  }
};
