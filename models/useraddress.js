'use strict';
module.exports = function (sequelize, DataTypes) {
  const UserAddress = sequelize.define('UserAddress', {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        UserAddress.belongsTo(models.User);
      }
    }
  });
  return UserAddress;
};