'use strict';

const models = require('../models');
const User = models.User;
const Task = require('co-task');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      const user = yield User.create({
        userName: 'admin',
        email: 'admin@admin.com',
        phoneNumber: '+989120000000',
        password: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        birthDateYear: 1395,
        birthDateMonth: 9,
        birthDateDay: 25,
        gender: 'male',
        weight: 100
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield User.destroy({
        where: {
          userName: 'admin'
        }
      });
    });
  }
};
