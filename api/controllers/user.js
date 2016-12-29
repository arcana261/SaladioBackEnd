'use strict';

const restified = require('../helpers/restified');
const {User, UserAddress, UserRole, Recommendation} = require('../../models');
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
      weight: body.weight,
      height: body.height
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
      addresses: (yield user.getUserAddresses()).map(x => x.address),
      height: user.height
    };

    if (user.weight !== null) {
      result.weight = user.weight;
    }

    res.json(result);
  },

  getCurrentUserNeeds: function*(t, req, res) {
    const {userId} = req.swagger.auth;

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    let result = null;

    if (user.gender === 'male') {
      result = {
        vitamin_a: 900,
        vitamin_c: 90,
        vitamin_d: 200,
        vitamin_e: 15,
        vitamin_k: 120,
        vitamin_b1: 1.2,
        vitamin_b2: 1.3,
        vitamin_b3: 16,
        vitamin_b6: 1.3,
        vitamin_b12: 2.4,
        calcium: 1000,
        copper: 0.9,
        iron: 8,
        magnesium: 420,
        manganese: 2.3,
        phosphorus: 700,
        zinc: 11
      };
    }
    else {
      result = {
        vitamin_a: 700,
        vitamin_c: 75,
        vitamin_d: 200,
        vitamin_e: 15,
        vitamin_k: 90,
        vitamin_b1: 1.1,
        vitamin_b2: 1.1,
        vitamin_b3: 14,
        vitamin_b6: 1.3,
        vitamin_b12: 2.4,
        calcium: 1000,
        copper: 0.9,
        iron: 18,
        magnesium: 310,
        manganese: 1.8,
        phosphorus: 700,
        zinc: 8
      };
    }

    if (user.weight !== null && user.height !== null &&
        user.birthDateYear !== null && user.birthDateMonth !== null && user.birthDateDay !== null) {
      if (user.gender === 'male') {
        result.energy = 66.5 + (13.75 * user.weight) + (5.003 * user.height) - (6.755 * user.age());
      }
      else {
        result.energy = 655.1 + (9.563 * user.weight) + (1.85 * user.height) - (4.676 * user.age());
      }
    }
    else {
      result.energy = null;
    }

    res.json(result);
  },

  promoteToFriends: function*(t, req, res) {
    const {
        friend: {
            value: {
                phoneNumber
            }
        }
    } = req.swagger.params;
    const {userId} = req.swagger.auth;

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    for (const phone of phoneNumber) {
      const recommendation = yield Recommendation.create({
        phoneNumber: phone
      }, {transaction: t});
      yield recommendation.setUser(user, {transaction: t});
    }

    res.json({id: 0});
  }
});
