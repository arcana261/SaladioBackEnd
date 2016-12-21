'use strict';

const models = require('../models');
const Salad = models.Salad;
const ClassicSalad = models.ClassicSalad;
const ClassicSaladCatagory = models.ClassicSaladCatagory;
const Task = require('co-task');

const data = [{
  saladData: {
    name: 'سالاد سزار',
    description: 'سالاد سزار خوشمزه',
    picture: '',
    callorie: 760,
    weight: 150,
    price: 170000,
    type: 'classic'
  },
  classicSaladData: {
    longDescription: 'یک سالاد خوشمزه از پای و سالاد!',
    ingredients: 'کاهو رسمی، سینه مرغ طعم دار شده، زیتون سیاه، گوجه گیلاسی، سس سزار'
  },
  catagory: 'سالادهای پایه کاهو'
}, {
  saladData: {
    name: 'سالاد چاینیز',
    description: 'سالاد چاینیز خوشمزه',
    picture: '',
    callorie: 760,
    weight: 150,
    price: 170000,
    type: 'classic'
  },
  classicSaladData: {
    longDescription: 'یه سالاد عالی و خوشمزه',
    ingredients: 'کاهو، سینه مرغ طعم دار شده، کنجد، گوجه گیلاسی، فلفل دلمه ای، سس کره بادام زمینی'
  },
  catagory: 'سالادهای پایه کاهو'
}];

module.exports = {
  up: function (queryInterface, Sequelize) {
    return Task.spawn(function*() {
      const allCatagories = data.map(x => x.catagory).sort().reduce(
          (prev, x) => (prev.length < 1 || prev[prev.length - 1] !== x) ? prev.concat([x]) : prev, []);
      let catagories = {};

      for (const catagory of allCatagories) {
        catagories[catagory] = yield ClassicSaladCatagory.create({
          catagory: catagory
        });
      }

      for (const {saladData, classicSaladData, catagory} of data) {
        const salad = yield Salad.create(saladData);
        const classicSalad = yield ClassicSalad.create(classicSaladData);

        yield classicSalad.setClassicSaladCatagory(catagories[catagory]);
        yield classicSalad.setSalad(salad);
      }
    });
  },

  down: function (queryInterface, Sequelize) {
    throw new Error('can not undo create-default-classic-salad seed');
  }
};
