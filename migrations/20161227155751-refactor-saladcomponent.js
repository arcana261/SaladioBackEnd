'use strict';

const sql = require('../api/helpers/sql');
const {attrs} = require('../meta/saladcomponent');

module.exports = sql.modernize({
  up: function* (t, queryInterface, Sequelize) {
    for (const col of attrs) {
      yield queryInterface.addColumn('SaladComponents', col, Sequelize.FLOAT, {transaction: t});
    }
    yield queryInterface.addColumn('SaladComponents', 'code', Sequelize.STRING, {transaction: t});
    yield queryInterface.addColumn('SaladComponents', 'description', Sequelize.STRING, {transaction: t});
    yield queryInterface.removeColumn('SaladComponents', 'callorie', {transaction: t});
  },

  down: function* (t, queryInterface, Sequelize) {
    for (const col of attrs) {
      yield queryInterface.removeColumn('SaladComponents', col, {transaction: t});
    }
    yield queryInterface.removeColumn('SaladComponents', 'code', {transaction: t});
    yield queryInterface.removeColumn('SaladComponents', 'description', {transaction: t});
    yield queryInterface.addColumn('SaladComponents', 'callorie', Sequelize.FLOAT, {transaction: t});
  }
});
