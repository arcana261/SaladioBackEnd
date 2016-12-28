'use strict';

const models = require('../models');
const DeliverySchedule = models.DeliverySchedule;
const Task = require('co-task');

const data = {
  launch: [[11, 12], [12, 13], [13, 14], [14, 15]],
  dinner: [[18, 19], [19, 20], [20, 21], [21, 22], [22, 23]]
};

module.exports = {
  up: function (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;

    return sequelize.transaction(t =>
        Task.spawn(function*() {
          const {dinner, launch} = data;

          for (const [from, to] of launch) {
            yield DeliverySchedule.create({
              catagory: 'launch',
              fromHour: from,
              toHour: to
            }, {transaction: t});
          }

          for (const [from, to] of launch) {
            yield DeliverySchedule.create({
              catagory: 'dinner',
              fromHour: from,
              toHour: to
            }, {transaction: t});
          }
        }));
  },

  down: function (queryInterface, Sequelize) {
    const sequelize = queryInterface.sequelize;

    return sequelize.transaction(t =>
        Task.spawn(function*() {
          const {dinner, launch} = data;

          for (const [from, to] of launch) {
            yield DeliverySchedule.destroy({
              where: {
                catagory: 'launch',
                fromHour: from,
                toHour: to
              },
              transaction: t
            });
          }

          for (const [from, to] of dinner) {
            yield DeliverySchedule.create({
              where: {
                catagory: 'dinner',
                fromHour: from,
                toHour: to
              },
              transaction: t
            });
          }
        }));
  }
};
