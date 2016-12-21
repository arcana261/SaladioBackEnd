'use strict';
module.exports = function (sequelize, DataTypes) {
  const UserRole = sequelize.define('UserRole', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  }, {
    classMethods: {
      associate: function (models) {
        UserRole.belongsTo(models.User);
      }
    }
  });
  return UserRole;
};