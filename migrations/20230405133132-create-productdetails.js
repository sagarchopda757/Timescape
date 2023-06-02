'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('productdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      prod_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references:{
          model:'products',
          key:'prod_id'
        }
      },
      color_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references:{
          model:'color_masters',
          key:'color_id'
        }
      },
      image: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      banner: {
        type: Sequelize.ENUM("yes","no"),
        allowNull: false,
        defaultValue:"no"
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      isdeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue:0,
        allowNull: false,
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
    await queryInterface.dropTable('productdetails');
  }
};