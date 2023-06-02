'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('orders', 'order_id', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('orders', 'status', {
          type: Sequelize.DataTypes.ENUM('pending','delivered','cancelled'),
          defaultValue:'pending'
        }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('orders', 'order_id', { transaction: t }),
        queryInterface.removeColumn('orders', 'status', { transaction: t })
      ]);
    });
  }
};
