const postService = require('../services/postService');

const create = async (req, res) => {
  const { body: post, userId } = req;

  try {
    const { code, data } = await postService.create({ post, userId });
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (_req, res) => {
  try {
    const { data, code } = await postService.getAll();
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const { data, code } = await postService.getById(id);
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;
  const newPost = req.body;

  try {
    const { data, code } = await postService.update({ newPost, id, userId });
    res.status(code).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { create, getAll, getById, update };
