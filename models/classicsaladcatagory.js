'use strict';
module.exports = function (sequelize, DataTypes) {
  const ClassicSaladCatagory = sequelize.define('ClassicSaladCatagory', {
    catagory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        ClassicSaladCatagory.hasMany(models.ClassicSalad);
      }
    }
  });
  return ClassicSaladCatagory;
};