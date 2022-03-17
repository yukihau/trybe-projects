const express = require('express');

const router = express.Router();

const validateJWT = require('../auth/validateJWT');
const postMiddlewares = require('../middlewares/postMiddlewares');
const postController = require('../controllers/postController');

router.post(
  '/',
  validateJWT,
  postMiddlewares.validateTitle,
  postMiddlewares.validateContent,
  postMiddlewares.validateCategoryIds,
  postController.create,
);

router.get(
  '/',
  validateJWT,
  postController.getAll,
);

router.get(
  '/:id',
  validateJWT,
  postController.getById,
);

router.put(
  '/:id',
  validateJWT,
  postMiddlewares.validateTitle,
  postMiddlewares.validateContent,
  postMiddlewares.validateThatThereAreNoCategoryIds,
  postController.update,
);

module.exports = router;