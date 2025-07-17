const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init({
  email: { type: DataTypes.STRING, unique: true },
  refreshToken: DataTypes.STRING,
}, { sequelize, modelName: 'user' });

module.exports = User;
