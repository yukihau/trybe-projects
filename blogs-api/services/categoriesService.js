const { Category } = require('../models');

const create = async (category) => {
  const result = await Category.create(category);
  return { code: 201, data: result };
};

const getAll = async () => {
  const result = await Category.findAll();

  return { code: 200, data: result };
};

module.exports = { create, getAll };
