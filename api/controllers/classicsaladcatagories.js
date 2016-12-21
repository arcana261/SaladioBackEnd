'use strict';

const models = require('../../models');
const restified = require('../helpers/restified');
const pasync = require('../helpers/pasync');
const ClassicSaladCatagory = models.ClassicSaladCatagory;

module.exports = restified({
  getClassicSaladCatagories: function*(t, req, res) {
    const {start: {value: start = 0}, length: {value: length}} = req.swagger.params;

    const recordsTotal = yield ClassicSaladCatagory.count({transaction: t});
    const result = {
      recordsTotal: recordsTotal,
      recordsFiltered: recordsTotal,
      data: yield pasync.map(yield ClassicSaladCatagory.findAll({
        limit: length,
        offset: start,
        transaction: t,
        order: [['id', 'ASC']]
      }), item => ({
        id: item.id,
        name: item.catagory
      }))
    };

    res.json(result);
  }
});
