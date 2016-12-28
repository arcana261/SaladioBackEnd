'use strict';

const {SaladComponent} = require('../../models');
const restified = require('../helpers/restified');

module.exports = restified({
  getSaladComponentById: function*(t, req, res) {
    const {
        componentId: {value: componentId}
    } = req.swagger.params;

    const saladComponent = yield SaladComponent.findOne({
      where: {id: componentId},
      transaction: t
    });

    return res.json({
      id: saladComponent.id,
      name: saladComponent.name,
      weight: saladComponent.weight,
      price: saladComponent.price,
      fat: saladComponent.fat,
      carbohydrat: saladComponent.carbohydrat,
      energy: saladComponent.energy,
      moisture: saladComponent.moisture,
      sugar: saladComponent.sugar,
      fibre: saladComponent.fibre,
      calcium: saladComponent.calcium,
      iron: saladComponent.iron,
      magnesium: saladComponent.magnesium,
      phosphorus: saladComponent.phosphorus,
      zinc: saladComponent.zinc,
      copper: saladComponent.copper,
      manganese: saladComponent.manganese,
      vitamin_e: saladComponent.vitamin_e,
      vitamin_d: saladComponent.vitamin_d,
      vitamin_c: saladComponent.vitamin_c,
      thiamin: saladComponent.thiamin,
      vitamin_b2: saladComponent.vitamin_b2,
      vitamin_b3: saladComponent.vitamin_b3,
      vitamin_b6: saladComponent.vitamin_b6,
      vitamin_b12: saladComponent.vitamin_b12,
      vitamin_k: saladComponent.vitamin_k,
      vitamin_a: saladComponent.vitamin_a,
      protein: saladComponent.protein,
      description: saladComponent.description,
      code: saladComponent.code
    });
  }
});
