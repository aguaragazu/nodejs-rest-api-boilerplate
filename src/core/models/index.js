const Sequelize = require('sequelize');
const config = require('../../config/config');

const sequelize = new Sequelize(config.sequelize.DB, config.sequelize.USER, config.sequelize.PASSWORD, {
  host: config.sequelize.HOST,
  dialect: config.sequelize.dialect,
  operatorsAliases: false,
  pool: config.sequelize.pool,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
module.exports.Token = require('./token.model');
module.exports.User = require('./user.model');
