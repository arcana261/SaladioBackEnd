'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const dialect = config.dialect;
const types = require('./types');
const Task = require('co-task');

class SqlUtils {
  foreignKeyUp(queryInterface, slaveTable, slaveKey, masterTable, masterKey, options) {
    return Task.spawn(function*() {
      if (dialect === 'postgres') {
        yield queryInterface.sequelize.query(
            `ALTER TABLE "${slaveTable}" ADD CONSTRAINT "${slaveKey.toLowerCase() + '_fkey'}"
            FOREIGN KEY("${slaveKey}") REFERENCES "${masterTable}"("${masterKey}") 
            MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;`, options);
        return true;
      }

      throw new Error(`unsupported dialect: ${dialect}`);
    });
  }

  foreignKeyDown(queryInterface, slaveTable, slaveKey, masterTable, masterKey, options) {
    return Task.spawn(function*() {
      if (dialect === 'postgres') {
        yield queryInterface.sequelize.query(
            `ALTER TABLE "${slaveTable}" DROP CONSTRAINT "${slaveKey.toLowerCase() + '_fkey'}";`, options)
        return true;
      }

      throw new Error(`unsupported dialect: ${dialect}`);
    });
  }

  modernize(obj) {
    let result = {};

    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        let value = obj[prop];

        if (types.isFunction(value) || types.isGeneratorFunction(value)) {
          let argCount = value.length;
          if (types.isGeneratorFunction(value)) {
            value = Task.async(value);
          }

          if (argCount == 2) {
            result[prop] = value;
          }
          else {
            result[prop] = function (queryInterface, Sequelize) {
              return queryInterface.sequelize.transaction(transaction => {
                return value(t, queryInterface, Sequelize);
              });
            };
          }
        }
        else {
          result[prop] = value;
        }
      }
    }

    return result;
  }
}

module.exports = new SqlUtils();
