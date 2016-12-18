"use strict";

module.exports = function (sequelize, DataTypes) {
  const SaladComponent = sequelize.define("SaladComponent", {
    name: {
      type: DataTypes.STRING
    },
    weight: {
      type: DataTypes.FLOAT
    },
    callorie: {
      type: DataTypes.FLOAT
    },
    price: {
      type: DataTypes.FLOAT
    }
  }, {
    classMethods: {
      associate: function (models) {
        SaladComponent.belongsTo(models.SaladComponentGroup);
      }
    }
  });

  return SaladComponent;
};
