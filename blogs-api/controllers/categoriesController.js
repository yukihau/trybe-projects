const categoriesService = require('../services/categoriesService');

const create = async (req, res) => {
  const category = req.body;

  try {
    const { data, code } = await categoriesService.create(category);
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { data, code } = await categoriesService.getAll();
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, getAll };
