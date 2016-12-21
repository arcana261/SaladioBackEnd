'use strict';

const models = require('../models');
const User = models.User;
const UserRole = models.UserRole;
const UserAddress = models.UserAddress;
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

      const appRole = yield UserRole.create({
        role: 'app'
      });

      const adminRole = yield UserRole.create({
        role: 'admin'
      });

      const address = yield UserAddress.create({
        address: 'saadat abad, majd, pelak 14, vahed 1'
      });

      yield user.addUserRole(appRole);
      yield user.addUserRole(adminRole);
      yield user.addUserAddress(address);
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
