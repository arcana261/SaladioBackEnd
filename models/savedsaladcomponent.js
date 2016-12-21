'use strict';
module.exports = function (sequelize, DataTypes) {
  const SavedSaladComponent = sequelize.define('SavedSaladComponent', {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        SavedSaladComponent.belongsTo(models.SaladComponent);
        SavedSaladComponent.belongsTo(models.SavedSalad);
      }
    }
  });
  return SavedSaladComponent;
};
