'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Task.spawn(function* () {
        yield queryInterface.addColumn('Orders', 'UserId', Sequelize.INTEGER, {transaction: t});
        yield sql.foreignKeyUp(queryInterface, 'Orders', 'UserId', 'Users', 'id', {transaction: t});
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Task.spawn(function* () {
        yield sql.foreignKeyDown(queryInterface, 'Orders', 'UserId', 'Users', 'id', {transaction: t});
        yield queryInterface.removeColumn('Orders', 'UserId', {transaction: t});
      });
    });
  }
};
