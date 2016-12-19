'use strict';

const Task = require('co-task');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('UserAddresses', 'UserId', Sequelize.INTEGER);
      yield queryInterface.sequelize.query('ALTER TABLE "UserAddresses"' +
        ' ADD CONSTRAINT "userid_fkey" FOREIGN KEY("UserId")' +
        ' REFERENCES "Users"("id") MATCH SIMPLE' +
        ' ON UPDATE CASCADE ON DELETE CASCADE;');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.sequelize.query('ALTER TABLE "UserAddresses" DROP CONSTRAINT "userid_fkey";');
      yield queryInterface.removeColumn('UserAddresses', 'UserId');
    });
  }
};
