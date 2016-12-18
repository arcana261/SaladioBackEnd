"use strict";

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
        result[prop] = function (req, res) {
          value(req, res)
              .then(() => {
              })
              .catch(err => {
                res.statusCode = 500;
                res.json({
                  code: -1,
                  message: (err instanceof Error) ? err.stack : err
                });
              });
        };
      }
      else {
        result[prop] = value;
      }
    }
  }

  return result;
};

