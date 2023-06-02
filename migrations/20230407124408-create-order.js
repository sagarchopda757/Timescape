'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }
      },
      addr_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'addresses',
          key:'id'
        }
      },
      proddet_id:{
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'productdetails',
          id:'id'
        }          
      },
      shippingtype: {
        type: Sequelize.ENUM('home','work'),
        allowNull:false,
        defaultValue:'home'
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
    await queryInterface.dropTable('orders');
  }
};