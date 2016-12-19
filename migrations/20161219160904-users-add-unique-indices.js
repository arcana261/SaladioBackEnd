'use strict';

const Task = require('co-task');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addIndex('Users', ['userName'], {indicesType: 'unique'});
      yield queryInterface.addIndex('Users', ['phoneNumber'], {indicesType: 'unique'});
      yield queryInterface.addIndex('Users', ['email'], {indicesType: 'unique'});
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.removeIndex('Users', ['email']);
      yield queryInterface.removeIndex('Users', ['phoneNumber']);
      yield queryInterface.removeIndex('Users', ['userName']);
    });
  }
};
