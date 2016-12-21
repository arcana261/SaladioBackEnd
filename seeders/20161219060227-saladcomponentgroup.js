'use strict';

const models = require('../models');
const sequelize = models.sequelize;
const SaladComponent = models.SaladComponent;
const SaladComponentGroup = models.SaladComponentGroup;
const Task = require('co-task');
const restified = require('../api/helpers/restified');

const initItems = [{
  name: 'پایه سالاد',
  items: [{
    name: 'کاهو پیچ',
    weight: 1,
    callorie: 1,
    price: 1
  }, {
    name: 'کاهو رسمی',
    weight: 1,
    callorie: 1,
    price: 1
  }, {
    name: 'اسفناج',
    weight: 1,
    callorie: 1,
    price: 1
  }, {
    name: 'کلم سفید',
    weight: 1,
    callorie: 1,
    price: 1
  }]
}, {
  name: 'سبزیجات',
  items: [{
    name: 'کلم سفید',
    weight: 1,
    callorie: 1,
    price: 1
  }, {
    name: 'پنیر پارمسان',
    weight: 1,
    callorie: 1,
    price: 1
  }]
}, {
  name: 'پنیر',
  items: [{
    name: 'پنیر پارمسان',
    weight: 1,
    callorie: 1,
    price: 1
  }]
}, {
  name: 'خشکبار',
  items: [{
    name: 'نان کروتون',
    weight: 1,
    callorie: 1,
    price: 1
  }]
}, {
  name: 'سس و ونیگار',
  items: [{
    name: 'سس سزار',
    weight: 1,
    callorie: 1,
    price: 1
  }]
}];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return restified.autocommit(function (t) {
      return Task.spawn(function*() {
        let records = yield SaladComponentGroup.count({transaction: t});

        if (records < 1) {
          for (const group of initItems) {
            let componentGroup = yield SaladComponentGroup.create({
              name: group.name
            }, {transaction: t});

            for (const item of group.items) {
              let component = yield SaladComponent.create(item, {transaction: t});
              yield componentGroup.addSaladComponent(component, {transaction: t});
            }
          }
        }
      });
    })();
  },

  down: function (queryInterface, Sequelize) {
    throw new Error('can not undo saladComponentGroup seed');
  }
};
