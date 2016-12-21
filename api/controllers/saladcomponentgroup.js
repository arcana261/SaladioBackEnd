"use strict";

const models = require('../../models');
const pasync = require('../helpers/pasync');
const SaladComponentGroup = models.SaladComponentGroup;
const SaladComponent = models.SaladComponent;
const restified = require('../helpers/restified');

module.exports = restified({
  getSaladComponentGroup: function*(t, req, res) {
    const {start: {value: start = 0}, length: {value: length}} = req.swagger.params;
    const recordsTotal = yield SaladComponentGroup.count({transaction: t});

    const result = {
      recordsTotal: recordsTotal,
      recordsFiltered: recordsTotal,
      data: yield pasync.map(yield SaladComponentGroup.findAll({
        offset: start,
        limit: length,
        order: [['id', 'ASC']],
        transaction: t
      }), function*(item) {
        return {
          name: item.name,
          items: (yield SaladComponent.findAll({
            include: [{
              model: SaladComponentGroup,
              where: {
                id: item.id
              }
            }],
            transaction: t
          })).map(x => ({
            id: x.id,
            name: x.name,
            callorie: x.callorie,
            weight: x.weight,
            price: x.price
          }))
        };
      })
    };

    res.json(result);
  }
});
