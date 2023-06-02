'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    prod_id:{ type:DataTypes.INTEGER,primaryKey:true},
    prod_name: DataTypes.STRING,
    prod_price: DataTypes.INTEGER,
    prod_brand: DataTypes.STRING,
    prod_description: DataTypes.STRING,
    cat_id: DataTypes.INTEGER,
    prod_status: DataTypes.ENUM('active','inactive'),
    prod_isdeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored:true,
    modelName: 'products',
  });
  return products;
};