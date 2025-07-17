const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class APIClient extends Model {}

APIClient.init({
  name: DataTypes.STRING,
  apiKey: DataTypes.STRING,
}, { sequelize, modelName: 'api_client' });

module.exports = APIClient;
