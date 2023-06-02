'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('categories_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cat_name: {
        type: Sequelize.STRING(60),
        allowNull:false
        
      },
      cat_image: {
        type: Sequelize.STRING(255),
        allowNull:false
      },
      cat_status: {
        type: Sequelize.ENUM('active','inactive'),
        allowNull:false,
        defaultValue:"inactive"
      },
      cat_isdeleted: {
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
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('categories_masters');
  }
};