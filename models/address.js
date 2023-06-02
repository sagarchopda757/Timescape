'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  address.init({
    addr_line1: DataTypes.STRING,
    addr_line2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    pincode: DataTypes.INTEGER,
    user_id: DataTypes.BIGINT,
    isdeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored:true,
    modelName: 'address',
  });
  return address;
};