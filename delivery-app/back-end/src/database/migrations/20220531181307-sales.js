"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("sales", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },

      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "users",
          key: "id",
        },
      },

      total_price: {
        type: Sequelize.DECIMAL(9, 2),
        allowNull: false,
      },

      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("sales");
  },
};
