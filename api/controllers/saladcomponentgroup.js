"use strict";

const models = require('../../models');
const sequelize = models.sequelize;
const SaladComponentGroup = models.SaladComponentGroup;
const SaladComponent = models.SaladComponent;
const Task = require('co-task');
const restified = require('../helpers/restified');

module.exports = restified({
  getSaladComponentGroup: function (t, req, res) {
    return Task.spawn(function*() {
      const recordsTotal = yield SaladComponentGroup.count({transaction: t});
      const recordsFiltered = recordsTotal;

      const all = yield SaladComponentGroup.findAll({
        offset: req.swagger.params.start.value,
        limit: req.swagger.params.length.value,
        order: [['id', 'ASC']],
        transaction: t
      });

      let result = [];
      for (const group of all) {
        const allItems = yield SaladComponent.findAll({
          include: [{
            model: SaladComponentGroup,
            where: {
              id: group.id
            }
          }],
          transaction: t
        });

        result.push({
          name: group.name,
          items: allItems.map(x => ({
            id: x.id,
            name: x.name,
            callorie: x.callorie,
            weight: x.weight,
            price: x.price
          }))
        });
      }

      res.json({
        recordsTotal: recordsTotal,
        recordsFiltered: recordsFiltered,
        data: result
      });
    });
  }
});
