'use strict';

const {
    Order, Salad, SavedSalad, DeliverySchedule, SavedSaladComponent, User, SaladComponent
} = require('../../models');

const restified = require('../helpers/restified');
const pasync = require('../helpers/pasync');

module.exports = restified({
  /**
   * @desc orderNewSalad
   * @param t
   * @param req
   * @param res
   */
  orderNewSalad: function*(t, req, res) {
    const {
        order: {
            value: {
                saladId, deliveryDate, deliveryScheduleId, address
            }
        }
    } = req.swagger.params;
    const {userId} = req.swagger.auth;

    const salad = yield Salad.findOne({
      where: {id: saladId},
      transaction: t
    });

    if (!salad) {
      throw new restified.errors.notFound(`requested salad not found: ${saladId}`);
    }

    const deliverySchedule = yield DeliverySchedule.findOne({
      where: {id: deliveryScheduleId},
      transaction: t
    });

    if (!deliverySchedule) {
      throw new restified.errors.notFound(`requested delivery schedule not found: ${deliveryScheduleId}`);
    }

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    const order = yield Order.create({
      deliveryDateYear: deliveryDate.year,
      deliveryDateMonth: deliveryDate.month,
      deliveryDateDay: deliveryDate.day,
      address: address,
      price: salad.price
    }, {transaction: t});

    yield order.setDeliverySchedule(deliverySchedule, {transaction: t});
    yield order.setSalad(salad, {transaction: t});
    yield order.setUser(user, {transaction: t});

    res.json({
      id: order.id
    });
  },

  /**
   * @desc orderNewCustomSalad
   * @param t
   * @param req
   * @param res
   */
  orderNewCustomSalad: function*(t, req, res) {
    const {
        orderCustomSalad: {
            value: {
                ingredients: pickedIngredients,
                deliveryDate: {
                    year: deliveryDateYear,
                    month: deliveryDateMonth,
                    day: deliveryDateDay
                },
                deliveryScheduleId: deliveryScheduleId,
                address: address,
                name: name
            }
        }
    } = req.swagger.params;
    const {userId} = req.swagger.auth;

    const ingredients = yield pasync.map(pickedIngredients, function*(item) {
      const saladComponent = yield SaladComponent.findOne({
        where: {id: item.saladComponentId},
        transaction: t
      });

      if (!saladComponent) {
        throw new restified.errors.notFound(`salad component not found: ${item.saladComponentId}`);
      }

      return {
        saladComponent: saladComponent,
        quantity: item.quantity
      };
    });

    const makeSum = function (key) {
      return ingredients.reduce((prev, item) => prev + (item.saladComponent[key] * item.quantity), 0);
    };

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    const callorie = makeSum('callorie');
    const weight = makeSum('weight');
    const price = makeSum('price');

    const salad = yield Salad.create({
      name: name,
      description: `سفارش داده شده`,
      picture: '',
      callorie: callorie,
      weight: weight,
      price: price,
      type: 'saved'
    }, {transaction: t});

    const savedSalad = yield SavedSalad.create({}, {
      transaction: t
    });

    yield savedSalad.setSalad(salad, {transaction: t});
    yield savedSalad.setUser(user, {transaction: t});

    for (const {saladComponent, quantity} of ingredients) {
      const savedSaladComponent = yield SavedSaladComponent.create({
        quantity: quantity
      }, {transaction: t});

      yield savedSaladComponent.setSavedSalad(savedSalad, {transaction: t});
      yield savedSaladComponent.setSaladComponent(saladComponent, {transaction: t});
    }

    const deliverySchedule = yield DeliverySchedule.findOne({
      where: {id: deliveryScheduleId},
      transaction: t
    });

    if (!deliverySchedule) {
      throw new restified.errors.notFound(`delivery schedule not found: ${deliveryScheduleId}`);
    }

    const order = yield Order.create({
      deliveryDateYear: deliveryDateYear,
      deliveryDateMonth: deliveryDateMonth,
      deliveryDateDay: deliveryDateDay,
      address: address,
      price: price
    }, {transaction: t});

    yield order.setSalad(salad, {transaction: t});
    yield order.setUser(user, {transaction: t});
    yield order.setDeliverySchedule(deliverySchedule, {transaction: t});

    res.json({
      id: order.id
    });
  },

  /**
   * @desc getOrdersByMe
   * @param t
   * @param req
   * @param res
   */
  getOrdersByMe: function*(t, req, res) {
    const {
        start: {value: start = 0},
        length: {value: length},
        fromDateYear: {value: fromDateYear = null},
        fromDateMonth: {value: fromDateMonth = null},
        fromDateDay: {value: fromDateDay = null},
        toDateYear: {value: toDateYear = null},
        toDateMonth: {value: toDateMonth = null},
        toDateDay: {value: toDateDay = null}
    } = req.swagger.params;
    const {userId} = req.swagger.auth;

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    let where = {};
    let builder = [{
      key: 'deliveryDateYear',
      range: [fromDateYear, toDateYear]
    }, {
      key: 'deliveryDateMonth',
      range: [fromDateMonth, toDateMonth]
    }, {
      key: 'deliveryDateDay',
      range: [fromDateDay, toDateDay]
    }];

    for (const {key, range: [from, to]} of builder) {
      if (from !== null || to !== null) {
        let query = {};

        if (from !== null) {
          query.$gte = from;
        }

        if (to !== null) {
          query.$lte = to;
        }

        where[key] = query;
      }
    }

    const result = {
      recordsTotal: yield user.countOrders({
        transaction: t
      }),
      recordsFiltered: yield user.countOrders({
        where: where,
        transaction: t
      }),
      data: yield pasync.map(yield user.getOrders({
        where: where,
        limit: length,
        offset: start,
        transaction: t
      }), item => ({
        id: item.id,
        saladId: item.SaladId,
        deliveryDate: {
          year: item.deliveryDateYear,
          month: item.deliveryDateMonth,
          day: item.deliveryDateDay
        },
        deliveryScheduleId: item.DeliveryScheduleId,
        address: item.address,
        price: item.price
      }))
    };

    res.json(result);
  }
});
