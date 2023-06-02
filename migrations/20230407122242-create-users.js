'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull:false
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM('male','female'),
      },
      password: {
        type: Sequelize.STRING(129)
      },
      mobileno:{
        type: Sequelize.BIGINT
      },
      auth_token: {
        type: Sequelize.STRING
      },
      user_login_type: {
        type: Sequelize.BOOLEAN,

      },
      user_status: {
        type: Sequelize.ENUM('active','inactive'),
        defaultValue:'inactive'
      },
      user_last_active: {
        type: Sequelize.DATE
      },
      isverified: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      access_token: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('users');
  }
};