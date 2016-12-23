'use strict';

const restified = require('../helpers/restified');
const {DeliverySchedule} = require('../../models');
const pasync = require('../helpers/pasync');

module.exports = restified({
  getDeliverySchedules: function*(t, req, res) {
    const {start: {value: start = 0}, length: {value: length}, catagory: {value: catagory = null}} = req.swagger.params;
    const where = {};

    if (catagory !== null) {
      where.catagory = catagory;
    }

    const result = {
      recordsTotal: yield DeliverySchedule.count({transaction: t}),
      recordsFiltered: yield DeliverySchedule.count({where: where, transaction: t}),
      data: yield pasync.map(yield DeliverySchedule.findAll({
        where: where,
        transaction: t,
        limit: length,
        offset: start,
        order: [['fromHour', 'ASC']]
      }), item => ({
        id: item.id,
        catagory: item.catagory,
        fromHour: item.fromHour,
        toHour: item.toHour
      }))
    };

    res.json(result);
  }
});
