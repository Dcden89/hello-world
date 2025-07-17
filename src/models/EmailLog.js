const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class EmailLog extends Model {}

EmailLog.init({
  userId: DataTypes.INTEGER,
  threadId: DataTypes.STRING,
  messageId: DataTypes.STRING,
  date: DataTypes.DATE,
  sender: DataTypes.STRING,
  recipients: DataTypes.TEXT,
  subject: DataTypes.TEXT,
  body: DataTypes.TEXT,
  cleanedBody: DataTypes.TEXT,
  direction: DataTypes.STRING,
  firstEngagement: DataTypes.BOOLEAN,
  messageType: DataTypes.STRING,
  responseTimeCustomer: DataTypes.FLOAT,
  responseTimeEmployee: DataTypes.FLOAT,
  domains: DataTypes.TEXT,
  domainCount: DataTypes.INTEGER,
  topDomain: DataTypes.STRING,
  allEmails: DataTypes.TEXT,
  accountId: DataTypes.STRING,
  accountName: DataTypes.STRING,
  uniqueMessageId: DataTypes.STRING,
  execSummary: DataTypes.TEXT,
  messageTags: DataTypes.TEXT,
  sentiment: DataTypes.STRING,
  emailCategory: DataTypes.STRING,
}, { sequelize, modelName: 'email_log' });

module.exports = EmailLog;
