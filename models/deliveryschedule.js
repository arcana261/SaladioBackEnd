'use strict';
module.exports = function (sequelize, DataTypes) {
  const DeliverySchedule = sequelize.define('DeliverySchedule', {
    catagory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['launch', 'dinner']]
      }
    },
    fromHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 24
      }
    },
    toHour: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 24
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        DeliverySchedule.hasMany(models.Order);
      }
    }
  });
  return DeliverySchedule;
};