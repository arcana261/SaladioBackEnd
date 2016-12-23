'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addIndex('ClassicSaladCatagories', ['catagory'], {indicesType: 'unique'});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeIndex('ClassicSaladCatagories', ['catagory']);
  }
};
