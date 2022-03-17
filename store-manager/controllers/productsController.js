const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const { code, data } = await productsService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await productsService.getById(id);
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const { code, data } = await productsService.create({ name, quantity });
  return res.status(code).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const { code, data } = await productsService.update({ id, name, quantity });
  return res.status(code).json(data);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const { code, data } = await productsService.remove(id);
  res.status(code).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
