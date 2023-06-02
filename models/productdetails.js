'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  productdetails.init({
    id:{type:DataTypes.BIGINT,primaryKey:true ,autoIncrement:true},
    prod_id:{type: DataTypes.BIGINT},
    color_id: DataTypes.BIGINT,
    image: DataTypes.STRING,
    banner: DataTypes.ENUM('yes','no'),
    quantity: DataTypes.INTEGER,
    isdeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored:true,
    modelName: 'productdetails',
  });
  return productdetails;
};