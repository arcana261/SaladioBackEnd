'use strict';
module.exports = function(sequelize, DataTypes) {
  const UserAddress = sequelize.define('UserAddress', {
    address: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        UserAddress.belongsTo(models.User);
      }
    }
  });
  return UserAddress;
};