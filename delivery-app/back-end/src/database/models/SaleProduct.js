"use strict";

module.exports = (sequelize, DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER
    },
    {
      tableName: 'sales_products',
      timestamps: false,
      underscored: true,
    }
  );

  saleProduct.associate =  (models) => {
    models.Product.belongsToMany(models.Sale, {
      through: saleProduct,
      as: "sales",
      foreignKey: "productId",
      otherKey: "saleId",
    });
    models.Sale.belongsToMany(models.Product, {
      through: saleProduct,
      as: "products",
      foreignKey: "saleId",
      otherKey: "productId",
    });
  };

  return saleProduct;
};
