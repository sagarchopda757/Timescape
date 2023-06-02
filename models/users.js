'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.ENUM('male','female'),
    password: DataTypes.STRING,
    mobileno:DataTypes.BIGINT,
    auth_token: DataTypes.STRING,
    user_login_type: DataTypes.BOOLEAN,
    user_status: DataTypes.ENUM('active','inactive'),
    user_last_active: DataTypes.DATE,
    isverified: DataTypes.BOOLEAN,
    isdeleted: DataTypes.BOOLEAN,
    access_token: DataTypes.STRING
  }, {
    sequelize,
    underscored:true,
    modelName: 'users',
  });
  return users;
};