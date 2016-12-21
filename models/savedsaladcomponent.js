'use strict';
module.exports = function(sequelize, DataTypes) {
  const SavedSaladComponent = sequelize.define('SavedSaladComponent', {
    quantity: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        SavedSaladComponent.belongsTo(models.SaladComponent);
        SavedSaladComponent.belongsTo(models.SavedSalad);
      }
    }
  });
  return SavedSaladComponent;
};
