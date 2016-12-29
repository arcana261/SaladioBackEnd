'use strict';
module.exports = function (sequelize, DataTypes) {
  const Recommendation = sequelize.define('Recommendation', {
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        //is: ['^(\\+?989\\d{2}|09\\d{2})\\d{7}$']
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Recommendation.belongsTo(models.User);
      }
    }
  });
  return Recommendation;
};