'use strict';

const restified = require('../helpers/restified');
const pasync = require('../helpers/pasync');
const {User} = require('../../models');

module.exports = restified({
  getSavedSaladsByMe: function*(t, req, res) {
    const {
        start: {value: start = 0},
        length: {value: length}
    } = req.swagger.params;
    const {userId} = req.swagger.auth;

    const user = yield User.findOne({
      where: {id: userId},
      transaction: t
    });

    const recordsTotal = yield user.countSavedSalads({transaction: t});

    const result = {
      recordsTotal: recordsTotal,
      recordsFiltered: recordsTotal,
      data: yield pasync.map(yield user.getSavedSalads({
        limit: length,
        offset: start,
        transaction: t
      }), function*(item) {
        const salad = yield item.getSalad({transaction: t});

        return {
          id: salad.id,
          name: salad.name,
          description: salad.description,
          picture: `http://${req.headers.host}/img/${salad.picture}`,
          callorie: salad.callorie,
          weight: salad.weight,
          price: salad.price,
          ingredients: (yield item.getSavedSaladComponents({transaction: t})).map(x => ({
            saladComponentId: x.SaladComponentId,
            quantity: x.quantity
          }))
        };
      })
    };

    res.json(result);
  }
});
