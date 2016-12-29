'use strict';

const sql = require('../api/helpers/sql');

module.exports = sql.modernize({
  up: function* (t, queryInterface, Sequelize) {
    yield queryInterface.addColumn('Recommendations', 'UserId', Sequelize.INTEGER, {transaction: t});
    yield sql.foreignKeyUp(queryInterface, 'Recommendations', 'UserId', 'Users', 'id', {transaction: t});
  },

  down: function* (t,queryInterface, Sequelize) {
    yield sql.foreignKeyDown(queryInterface, 'Recommendations', 'UserId', 'Users', 'id', {transaction: t});
    yield queryInterface.removeColumn('Recommendations', 'UserId', {transaction: t});
  }
});
