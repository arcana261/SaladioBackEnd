'use strict';

const auth = require('basic-auth');
const models = require('../../models');
const User = models.User;
const Task = require('co-task');

module.exports = {
  basic: function (req, res, key, next) {
    Task.spawn(function* () {
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
    }).then(() => next()).catch(err => next(err));
  }
};
