'use strict';

const sql = require('../api/helpers/sql');

module.exports = sql.modernize({
  up: function* (t, queryInterface, Sequelize) {
    yield queryInterface.addColumn('Users', 'height', Sequelize.INTEGER);
  },

  down: function* (queryInterface, Sequelize) {
    yield queryInterface.removeColumn('Users', 'height');
  }
});
