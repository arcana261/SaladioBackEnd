'use strict';

const Task = require('co-task');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function*() {
      yield queryInterface.addColumn('SaladComponents', 'SaladComponentGroupId', Sequelize.INTEGER);
      yield queryInterface.sequelize.query('ALTER TABLE "SaladComponents" ADD CONSTRAINT ' +
        '"SaladComponentGroupId_fkey" FOREIGN KEY ("SaladComponentGroupId") REFERENCES ' +
        '"SaladComponentGroups"("id") MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function*() {
      yield queryInterface.sequelize.query('ALTER TABLE "SaladComponents" DROP CONSTRAINT "SaladComponentGroupId_fkey";');
      yield queryInterface.removeColumn('SaladComponents', 'SaladComponentGroupId');
    });
  }
};
