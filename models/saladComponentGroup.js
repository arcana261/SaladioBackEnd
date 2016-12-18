"use strict";

module.exports = function (sequelize, DataTypes) {
  const SaladComponentGroup = sequelize.define("SaladComponentGroup", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        SaladComponentGroup.hasMany(models.SaladComponent);
      }
    }
  });

  return SaladComponentGroup;
};
