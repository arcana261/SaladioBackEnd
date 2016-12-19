'use strict';
module.exports = function(sequelize, DataTypes) {
  const SaladComponent = sequelize.define('SaladComponent', {
    name: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    callorie: DataTypes.FLOAT,
    price: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        SaladComponent.belongsTo(models.SaladComponentGroup);
      }
    }
  });
  return SaladComponent;
};