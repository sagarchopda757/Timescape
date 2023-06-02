'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('color_masters', {
      color_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      color_code: {
        type: Sequelize.STRING(7),
        allowNull:false
      },
      isdeleted:{
        type: Sequelize.BOOLEAN,
        defaultValue:0
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      },
      updated_at: {
        type: "TIMESTAMP",
        underscored: true,

        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('color_masters');
  }
};