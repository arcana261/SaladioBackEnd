'use strict';
module.exports = function (sequelize, DataTypes) {
  const SaladComponentGroup = sequelize.define('SaladComponentGroup', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        SaladComponentGroup.hasMany(models.SaladComponent);
      }
    }
  });
  return SaladComponentGroup;
};