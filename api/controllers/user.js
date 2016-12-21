'use strict';

const restified = require('../helpers/restified');
const Task = require('co-task');
const models = require('../../models');
const User = models.User;
const UserAddress = models.UserAddress;
const types = require('../helpers/types');

module.exports = restified({
  signup: function*(t, req, res) {
    const body = req.swagger.params.signup.value;

    if (types.isString(body.userName)) {
      throw new restified.errors.badRequest(`username was provided: ${body.userName}`);
    }

    const user = yield User.create({
      userName: body.email,
      email: body.email,
      phoneNumber: body.phoneNumber,
      password: body.password,
      firstName: body.firstName,
      lastName: body.lastName,
      birthDateYear: body.birthDate.year,
      birthDateMonth: body.birthDate.month,
      birthDateDay: body.birthDate.day,
      gender: body.gender,
      weight: body.weight
    }, {transaction: t});

    for (const address of body.addresses) {
      const userAddress = yield UserAddress.create({
        address: address
      }, {transaction: t});

      yield user.addUserAddress(userAddress, {transaction: t});
    }

    res.json({
      userName: user.userName
    });
  }
});
