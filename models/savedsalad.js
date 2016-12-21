'use strict';
module.exports = function(sequelize, DataTypes) {
  const SavedSalad = sequelize.define('SavedSalad', {
  }, {
    classMethods: {
      associate: function(models) {
        SavedSalad.belongsTo(models.Salad);
        SavedSalad.hasMany(models.SavedSaladComponent);
        SavedSalad.belongsTo(models.User);
      }
    }
  });
  return SavedSalad;
};