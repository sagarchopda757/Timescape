'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    user_id: DataTypes.BIGINT,
    prod_id: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    underscored:true,
    modelName: 'cart',
  });
  return cart;
};