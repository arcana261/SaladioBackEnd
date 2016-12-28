'use strict';

const {attrs} = require('../meta/saladcomponent');

module.exports = function (sequelize, DataTypes) {
  const SaladComponent = sequelize.define('SaladComponent', Object.assign({
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
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, (function() {
    let result = {};

    for (const col of attrs) {
      result[col] = {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 0
        }
      }
    }

    return result;
  })()), {
    classMethods: {
      associate: function (models) {
        SaladComponent.belongsTo(models.SaladComponentGroup);
        SaladComponent.hasMany(models.SavedSaladComponent);
      }
    }
  });
  return SaladComponent;
};