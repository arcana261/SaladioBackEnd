'use strict';
module.exports = function(sequelize, DataTypes) {
  var Salad = sequelize.define('Salad', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    callorie: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Salad;
};