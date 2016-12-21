'use strict';

const restified = require('../helpers/restified');
const {ClassicSaladCatagory} = require('../../models');
const pasync = require('../helpers/pasync');

module.exports = restified({
  getClassicSaladsByCatagory: function*(t, req, res) {
    const {
        start: {value: start = 0},
        length: {value: length},
        catagoryId: {value: catagoryId}
    } = req.swagger.params;

    const catagory = yield ClassicSaladCatagory.findOne({
      where: {id: catagoryId},
      transaction: t
    });

    if (!catagory) {
      throw new restified.errors.notFound(`catagory not found: ${catagoryId}`);
    }

    const recordsTotal = yield catagory.countClassicSalads({transaction: t});

    const result = {
      recordsTotal: recordsTotal,
      recordsFiltered: recordsTotal,
      data: yield pasync.map(yield catagory.getClassicSalads({
        limit: length,
        offset: start,
        transaction: t
      }), function* (item) {
        const salad = yield item.getSalad({transaction: t});

        return {
          id: salad.id,
          name: salad.name,
          description: salad.description,
          picture: `http://${req.headers.host}/img/${salad.picture}`,
          callorie: salad.callorie,
          weight: salad.weight,
          price: salad.price,
          longDescription: item.longDescription,
          ingredients: item.ingredients
        };
      })
    };

    res.json(result);
  }
});

