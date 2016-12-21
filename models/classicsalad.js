'use strict';
module.exports = function(sequelize, DataTypes) {
  const ClassicSalad = sequelize.define('ClassicSalad', {
    longDescription: DataTypes.TEXT,
    ingredients: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        ClassicSalad.belongsTo(models.Salad);
      }
    }
  });
  return ClassicSalad;
};