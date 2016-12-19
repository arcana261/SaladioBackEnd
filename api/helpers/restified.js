"use strict";

const models = require('../../models');
const sequelize = models.sequelize;
const env = process.env.NODE_ENV || 'development';
const isStackTraceAvailable = env !== 'production';

function isFunction(functionToCheck) {
  let getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);

    this._statusCode = statusCode;
  }

  get statusCode() {
    return this._statusCode;
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message, 409);
  }
}

class InternalServerError extends CustomError {
  constructor(message) {
    super(message, 500);
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message, 400);
  }
}

module.exports = function (obj) {
  let result = {};

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      const value = obj[prop];
      if (isFunction(value)) {
        const errorHandler = function (req, res, err) {
          res.statusCode = (err instanceof CustomError) ? err.statusCode : 500;
          res.json({
            code: -1,
            message: (err instanceof Error) ? err.message : 'internal server error occured',
            stack: (err instanceof Error) ?
              (isStackTraceAvailable ? err.stack : 'stack trace disabled in production mode') : err
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

module.exports.errors = {
  conflict: ConflictError,
  badRequest: BadRequestError,
  internalServerError: InternalServerError
};


