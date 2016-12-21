'use strict';

const Task = require('co-task');
const sql = require('../api/helpers/sql');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield queryInterface.addColumn('Orders', 'DeliveryScheduleId', Sequelize.INTEGER);
      yield sql.foreignKeyUp(queryInterface, 'Orders', 'DeliveryScheduleId', 'DeliverySchedules', 'id');
    });
  },

  down: function (queryInterface, Sequelize) {
    return Task.spawn(function* () {
      yield sql.foreignKeyDown(queryInterface, 'Orders', 'DeliveryScheduleId', 'DeliverySchedules', 'id');
      yield queryInterface.removeColumn('Orders', 'DeliveryScheduleId');
    });
  }
};
