'use strict';
module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    deliveryDateYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1390,
        max: 1410
      }
    },
    deliveryDateMonth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 12
      }
    },
    deliveryDateDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 31
      }
    },
    address: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        Order.belongsTo(models.Salad);
        Order.belongsTo(models.DeliverySchedule);
      }
    }
  });
  return Order;
};