"use strict";

const models = require('../../models');
const sequelize = models.sequelize;
const Sequelize = sequelize.Sequelize;
const env = process.env.NODE_ENV || 'development';
const isStackTraceAvailable = env !== 'production';
const Task = require('co-task');
const types = require('./types');

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

class NotFoundError extends CustomError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = function (obj) {
  let result = {};

  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      let value = obj[prop];
      if (types.isFunction(value) || types.isGeneratorFunction(value)) {
        let argCount = value.length;
        if (types.isGeneratorFunction(value)) {
          value = Task.async(value);
        }

        const errorHandler = function (req, res, err) {
          let statusCode = 500;
          let message = 'internal server error occured';
          let stack = '';

          if (err instanceof Error) {
            message = err.message;

            if (isStackTraceAvailable) {
              stack = err.stack;
            }
            else {
              stack = 'stack trace disabled in production mode';
            }

            if (err instanceof CustomError) {
              statusCode = err.statusCode;
            }
            else if (err instanceof Sequelize.UniqueConstraintError) {
              statusCode = 409;
              message = JSON.stringify(err.errors);
            }
          }

          res.statusCode = statusCode;
          res.json({
            code: -1,
            message: message,
            stack: stack
          });
        };

        if (argCount == 2) {
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
  internalServerError: InternalServerError,
  notFound: NotFoundError
};


