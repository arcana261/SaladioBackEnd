'use strict';

const restified = require('../helpers/restified');
const {User, UserAddress, UserRole} = require('../../models');
const types = require('../helpers/types');

module.exports = restified({
  signup: function*(t, req, res) {
    const {signup: {value: body}} = req.swagger.params;

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

    yield user.createUserRole({
      role: 'app'
    }, {transaction: t});

    res.json({
      userName: user.userName
    });
  },

  getCurrentUser: function*(t, req, res) {
    const {userId} = req.swagger.auth;

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    const result = {
      userName: user.userName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      birthDate: {
        year: user.birthDateYear,
        month: user.birthDateMonth,
        day: user.birthDateDay
      },
      gender: user.gender,
      addresses: (yield user.getUserAddresses()).map(x => x.address)
    };

    if (user.weight !== null) {
      result.weight = user.weight;
    }

    res.json(result);
  }
});
