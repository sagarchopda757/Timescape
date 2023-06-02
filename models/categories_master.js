'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class categories_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  categories_master.init({
    cat_name: DataTypes.STRING,
    cat_image: DataTypes.STRING,
    cat_status: DataTypes.ENUM('active','inactive'),
    cat_isdeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored:true,
    modelName: 'categories_master',
  });
  return categories_master;
};