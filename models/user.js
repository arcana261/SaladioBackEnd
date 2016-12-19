'use strict';
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDateYear: DataTypes.INTEGER,
    birthDateMonth: DataTypes.INTEGER,
    birthDateDay: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    weight: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.UserAddress);
      }
    }
  });
  return User;
};