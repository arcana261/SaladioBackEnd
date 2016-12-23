'use strict';

const Task = require('co-task');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Task.spawn(function*() {
        yield queryInterface.addIndex('Orders',
            ['UserId', 'deliveryDateYear', 'deliveryDateMonth', 'deliveryDateDay'], {transaction: t});
        yield queryInterface.addIndex('Orders',
            ['deliveryDateYear', 'deliveryDateMonth', 'deliveryDateDay'], {transaction: t});
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Task.spawn(function*() {
        yield queryInterface.removeIndex('Orders',
            ['deliveryDateYear', 'deliveryDateMonth', 'deliveryDateDay'],
            {transaction: t});
        yield queryInterface.removeIndex('Orders',
            ['UserId', 'deliveryDateYear', 'deliveryDateMonth', 'deliveryDateDay'],
            {transaction: t});
      });
    });
  }
};
