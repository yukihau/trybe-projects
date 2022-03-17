const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { code, data } = await salesService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const { code, data } = await salesService.getById(id);
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const items = req.body;
  const { code, data } = await salesService.create(items);
  return res.status(code).json(data);
};

const update = async (req, res) => {
  const { id } = req.params;
  const items = req.body;

  const { code, data } = await salesService.update(id, items);
  return res.status(code).json(data);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
