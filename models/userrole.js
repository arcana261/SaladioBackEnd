'use strict';
module.exports = function(sequelize, DataTypes) {
  const UserRole = sequelize.define('UserRole', {
    role: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        UserRole.belongsTo(models.User);
      }
    }
  });
  return UserRole;
};