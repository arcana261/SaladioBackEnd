'use strict';
module.exports = function(sequelize, DataTypes) {
  const ClassicSalad = sequelize.define('ClassicSalad', {
    longDescription: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    ingredients: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        ClassicSalad.belongsTo(models.Salad);
        ClassicSalad.belongsTo(models.ClassicSaladCatagory);
      }
    }
  });
  return ClassicSalad;
};