'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init({
    user_id: DataTypes.BIGINT,
    addr_id: DataTypes.BIGINT,
    proddet_id :DataTypes.BIGINT ,
    shippingtype: DataTypes.ENUM('home','work'),
    order_id:DataTypes.INTEGER,
    status:DataTypes.ENUM('pending','delivered','cancelled')

  }, {
    sequelize,
    underscored:true,
    modelName: 'order',
  });
  return order;
};