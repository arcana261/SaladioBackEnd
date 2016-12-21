'use strict';
module.exports = function (sequelize, DataTypes) {
  const Salad = sequelize.define('Salad', {
    name: {
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
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    callorie: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
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
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['saved', 'classic']]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Salad.hasOne(models.SavedSalad);
        Salad.hasOne(models.ClassicSalad);
        Salad.hasMany(models.Order);
      }
    }
  });
  return Salad;
};