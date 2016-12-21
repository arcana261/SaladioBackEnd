'use strict';
module.exports = function(sequelize, DataTypes) {
  const Salad = sequelize.define('Salad', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    picture: DataTypes.STRING,
    callorie: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: ['saved', 'classic']
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Salad.hasOne(models.SavedSalad);
        Salad.hasOne(models.ClassicSalad);
      }
    }
  });
  return Salad;
};