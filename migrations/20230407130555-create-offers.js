'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull:false
      },
      cat_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'categories_masters',
          key:'id'
        }
      },
      prod_id: {
        type: Sequelize.BIGINT,
        references:{
          model:'products',
          key:'prod_id'
        }
      },
      offer_details: {
        type: Sequelize.STRING,
        allowNull:false
      },
      discont_type: {
        type: Sequelize.ENUM('percentage','fixvalue'),
        allowNull:false,
        defaultValue:'fixvalue'
      },
      discount_price: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      offer_from: {
        type: Sequelize.DATE
      },
      offer_till: {
        type: Sequelize.DATE
      },
      offer_order: {
        type: Sequelize.INTEGER(3),
        defaultValue:1
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull:false
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('offers');
  }
};