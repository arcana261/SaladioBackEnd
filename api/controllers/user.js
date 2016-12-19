'use strict';

const restified = require('../helpers/restified');
const Task = require('co-task');
const models = require('../../models');
const User = models.User;
const UserAddress = models.UserAddress;

module.exports = restified({
  signup: function (t, req, res) {
    return Task.spawn(function* () {
      const body = req.swagger.params.signup.value;

    });
  }
});
