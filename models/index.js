'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes,Op} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op =Op;
db.admin = require('./admin')(sequelize,DataTypes)
db.categories_master = require('./categories_master')(sequelize,DataTypes)
db.products = require('./products')(sequelize,DataTypes)
db.productdetails =require('./productdetails')(sequelize,DataTypes)
db.color_master = require("./color_master")(sequelize,DataTypes)
db.address = require('./address')(sequelize,DataTypes)
db.cart = require('./cart')(sequelize,DataTypes)
db.favourites = require('./favourites')(sequelize,DataTypes)
db.offers = require('./offers')(sequelize,DataTypes)
db.order = require('./order')(sequelize,DataTypes)
db.users = require('./users')(sequelize,DataTypes)
module.exports = db;
