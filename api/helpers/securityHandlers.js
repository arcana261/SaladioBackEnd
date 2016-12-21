'use strict';

const auth = require('basic-auth');
const models = require('../../models');
const User = models.User;
const Task = require('co-task');
const types = require('./types');

module.exports = {
  basic: function (req, res, key, next) {
    Task.spawn(function*() {
      const credentials = auth.parse(req.headers.authorization);
      const user = yield User.findOne({
        where: {
          userName: credentials.name,
          password: credentials.pass
        }
      });

      if (!user) {
        throw new Error('username/password invalid');
      }

      if ('x-required-role' in req.swagger.operation) {
        let required = req.swagger.operation['x-required-role'];
        if (!types.isArray(required)) {
          required = [required];
        }

        const roles = yield user.getUserRoles();

        if (!roles.some(x => required.indexOf(x.role) >= 0)) {
          throw new Error('user does not match required role');
        }
      }
    }).then(() => next()).catch(err => next(err));
  }
};
