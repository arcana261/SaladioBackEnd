'use strict';

const {SaladComponent} = require('../../models');
const restified = require('../helpers/restified');

module.exports = restified({
  getSaladComponentById: function*(t, req, res){
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
      callorie: saladComponent.callorie,
      price: saladComponent.price
    });
  }
});
