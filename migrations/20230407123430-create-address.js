'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      addr_line1: {
        type: Sequelize.STRING,
        allowNull:false
      },
      addr_line2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      state: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      country: {
        type: Sequelize.STRING(30),
        allowNull:false
      },
      pincode: {
        type: Sequelize.INTEGER(6),
        allowNull:false
      },
      user_id: {
        type: Sequelize.BIGINT,
        allowNull:false,
        references:{
          model:'users',
          key:'id'
        }
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
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
    await queryInterface.dropTable('addresses');
  }
};