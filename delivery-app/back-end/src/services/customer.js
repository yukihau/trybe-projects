const { Product } = require('../database/models');

module.exports = {
  products: () => ({
    getAll: async () => {
      const products = await Product.findAll();
      return products;
    },
    getOne: async () => {
      const products = await Product.findOne();
      return products;
    },
  }),
};
