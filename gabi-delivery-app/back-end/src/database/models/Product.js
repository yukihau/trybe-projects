'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      url_image: DataTypes.STRING,
    },
    {
      tableName: 'products',
      timestamps: false,
    }
  );

  return Product;
};
