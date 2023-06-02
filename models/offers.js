'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class offers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  offers.init({
    name: DataTypes.STRING,
    cat_id: DataTypes.BIGINT,
    prod_id: DataTypes.BIGINT,
    offer_details: DataTypes.STRING,
    discont_type: DataTypes.ENUM('percentage','fixvalue'),
    discount_price: DataTypes.INTEGER,
    offer_from: DataTypes.DATE,
    offer_till: DataTypes.DATE,
    offer_order: DataTypes.INTEGER,
    isdeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    underscored:true,
    modelName: 'offers',
  });
  return offers;
};