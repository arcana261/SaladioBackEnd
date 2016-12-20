'use strict';

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/config.json')[env];
const dialect = config.dialect;
const Task = require('co-task');

class SqlUtils {
  /**
   * @desc
   * @param queryInterface
   * @param slaveTable
   * @param slaveKey
   * @param masterTable
   * @param masterKey
   */
  foreignKeyUp(queryInterface, slaveTable, slaveKey, masterTable, masterKey) {
    return Task.spawn(function* () {
      if (dialect === 'postgres') {
        yield queryInterface.sequelize.query(
            `ALTER TABLE "${slaveTable}" ADD CONSTRAINT "${slaveKey.toLowerCase() + '_fkey'}"
            FOREIGN KEY("${slaveKey}") REFERENCES "${masterTable}"("${masterKey}") 
            MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;`);
        return true;
      }

      throw new Error(`unsupported dialect: ${dialect}`);
    });
  }

  /**
   * @desc
   * @param queryInterface
   * @param slaveTable
   * @param slaveKey
   * @param masterTable
   * @param masterKey
   */
  foreignKeyDown(queryInterface, slaveTable, slaveKey, masterTable, masterKey) {
    return Task.spawn(function* () {
      if (dialect === 'postgres') {
        yield queryInterface.sequelize.query(
            `ALTER TABLE "${slaveTable}" DROP CONSTRAINT "${slaveKey.toLowerCase() + '_fkey'}";`)
        return true;
      }

      throw new Error(`unsupported dialect: ${dialect}`);
    });
  }
}

module.exports = new SqlUtils();
