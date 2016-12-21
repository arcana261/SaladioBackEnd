'use strict';
module.exports = function (sequelize, DataTypes) {
  const SaladComponent = sequelize.define('SaladComponent', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    callorie: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        SaladComponent.belongsTo(models.SaladComponentGroup);
        SaladComponent.hasMany(models.SavedSaladComponent);
      }
    }
  });
  return SaladComponent;
};