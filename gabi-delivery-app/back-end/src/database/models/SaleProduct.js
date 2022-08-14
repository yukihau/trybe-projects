"use strict";

const associate = (models) => {
  models.Sale.belongsToMany(models.Product, {
    as: "products",
    through: models.SaleProduct,
    foreignKey: "sale_id",
    otherKey: "product_id",
  });
  models.Product.belongsToMany(models.Sale, {
    as: "sales",
    through: models.SaleProduct,
    foreignKey: "product_id",
    otherKey: "sale_id",
  });
  
}

module.exports = (sequelize, _DataTypes) => {
  const saleProduct = sequelize.define(
    'SaleProduct',
    {},
    {
      tableName: 'salesProducts',
      timestamps: false,
    }
  );

  saleProduct.associate = associate;

  return saleProduct;
};
