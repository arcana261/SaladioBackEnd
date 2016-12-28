"use strict";

const {SaladComponent, SaladComponentGroup} = require('../../models');
const pasync = require('../helpers/pasync');
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
            weight: x.weight,
            price: x.price,
            fat: x.fat,
            carbohydrat: x.carbohydrat,
            energy: x.energy,
            moisture: x.moisture,
            sugar: x.sugar,
            fibre: x.fibre,
            calcium: x.calcium,
            iron: x.iron,
            magnesium: x.magnesium,
            phosphorus: x.phosphorus,
            zinc: x.zinc,
            copper: x.copper,
            manganese: x.manganese,
            vitamin_e: x.vitamin_e,
            vitamin_d: x.vitamin_d,
            vitamin_c: x.vitamin_c,
            thiamin: x.thiamin,
            vitamin_b2: x.vitamin_b2,
            vitamin_b3: x.vitamin_b3,
            vitamin_b6: x.vitamin_b6,
            vitamin_b12: x.vitamin_b12,
            vitamin_k: x.vitamin_k,
            vitamin_a: x.vitamin_a,
            protein: x.protein,
            description: x.description,
            code: x.code
          }))
        };
      })
    };

    res.json(result);
  }
});
