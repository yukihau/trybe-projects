const userService = require('../services/userService');

const create = async (req, res) => {
  const user = req.body;

  try {
    const { data, code } = await userService.create(user);
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { data, code } = await userService.getAll();
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, code } = await userService.getById(id);
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, getAll, getById };
