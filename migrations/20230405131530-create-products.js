'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      prod_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      prod_name: {
        type: Sequelize.STRING(60),
        allowNull:false
      },
      prod_price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      prod_brand: {
        type: Sequelize.STRING(60),
        allowNull:false
      },
      prod_description: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      cat_id: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{
          model:'categories_masters',
          key:'id'
        }

      },
      prod_status: {
        type: Sequelize.ENUM('active','inactive'),
        allowNull:false,
        defaultValue:'inactive'
      },
      prod_isdeleted: {
        type: Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:0
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: "TIMESTAMP",
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};