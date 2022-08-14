"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable("sales_products", {
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        references: {
          model: "sales",
          key: "id",
        },
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        primaryKey: true,
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    }
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable("salesProducts");
  },
};
