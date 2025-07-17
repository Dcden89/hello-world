const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Exclusion extends Model {}

Exclusion.init({
  type: DataTypes.STRING,
  value: DataTypes.STRING,
}, { sequelize, modelName: 'exclusion' });

module.exports = Exclusion;
