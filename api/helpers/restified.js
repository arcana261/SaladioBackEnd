"use strict";

const models = require('../../models');
const sequelize = models.sequelize;

function isFunction(functionToCheck) {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

module.exports = function (obj) {
  let result = {};

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      if (isFunction(value)) {
        const errorHandler = function (req, res, err) {
          res.statusCode = 500;
          res.json({
            code: -1,
            message: (err instanceof Error) ? err.stack : err
          });
        };

        if (value.length == 2) {
          result[prop] = function (req, res) {
            value(req, res)
              .catch(err => errorHandler(req, res, err));
          };
        }
        else {
          result[prop] = function (req, res) {
            let t = null;

            sequelize.transaction()
              .then(function (transaction) {
                t = transaction;
                return value(t, req, res);
              }).then(function () {
              return t.commit();
            }).catch(function (err) {
              t.rollback().finally(function () {
                errorHandler(req, res, err);
              });
            });
          }
        }
      }
      else {
        result[prop] = value;
      }
    }
  }

  return result;
};

module.exports.autocommit = function (fn) {
  return function () {
    const args = Array.from(arguments);
    let t = null;

    return sequelize.transaction()
      .then(function (transaction) {
        t = transaction;
        return fn.apply(this, [t].concat(args));
      }).then(() => t.commit()).catch(err => {
        return t.rollback().finally(() => {
          throw err;
        });
      });
  };
};
