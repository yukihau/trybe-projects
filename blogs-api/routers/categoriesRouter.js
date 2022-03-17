const express = require('express');

const router = express.Router();

const categoriesMiddlewares = require('../middlewares/categoriesMiddlewares');
const categoriesController = require('../controllers/categoriesController');
const validateJWT = require('../auth/validateJWT');

router.post(
  '/',
  validateJWT,
  categoriesMiddlewares.validateName,
  categoriesController.create,
);

router.get(
  '/',
  validateJWT,
  categoriesController.getAll,
);

module.exports = router;