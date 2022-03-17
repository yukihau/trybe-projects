const productsModel = require('../models/productsModel');

const NOT_FOUND = 'Product not found';
const PRODUCT_EXISTS = 'Product already exists';

const getAll = async () => {
  const result = await productsModel.getAll();
  return { code: 200, data: result };
};

const getById = async (id) => {
  const result = await productsModel.getById(id);

  if (!result) return { code: 404, data: { message: NOT_FOUND } };

  return { code: 200, data: result };
};

const create = async ({ name, quantity }) => {
  const productExists = await productsModel.getByName(name);

  if (productExists) return { code: 409, data: { message: PRODUCT_EXISTS } };

  const result = await productsModel.create({ name, quantity });

  return { code: 201, data: result };
};

const update = async ({ id, name, quantity }) => {
  const productExists = await productsModel.getById(id);

  if (!productExists) return { code: 404, data: { message: NOT_FOUND } };

  const result = await productsModel.update({ id, name, quantity });

  return { code: 200, data: result };
};

const remove = async (id) => {
  const productExists = await productsModel.getById(id);

  if (!productExists) return { code: 404, data: { message: NOT_FOUND } };

  await productsModel.remove(id);

  return { code: 204, data: {} };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
