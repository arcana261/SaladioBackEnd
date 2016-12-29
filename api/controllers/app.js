'use strict';

const restified = require('../helpers/restified');

module.exports = restified({
  checkAppVersion: function*(t, req, res) {
    res.json({isOk: true});
  }
});
