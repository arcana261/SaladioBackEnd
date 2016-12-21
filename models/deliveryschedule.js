'use strict';
module.exports = function(sequelize, DataTypes) {
  var DeliverySchedule = sequelize.define('DeliverySchedule', {
    catagory: DataTypes.STRING,
    fromHour: DataTypes.INTEGER,
    toHour: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return DeliverySchedule;
};