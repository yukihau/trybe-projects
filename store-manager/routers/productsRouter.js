const express = require('express');

const productsMiddlewares = require('../middlewares/productsMiddlewares');
const productsController = require('../controllers/productsController');

const router = express.Router();

router.get(
  '/',
  productsController.getAll,
);

router.get(
  '/:id',
  productsController.getById,
);

router.post(
  '/',
  productsMiddlewares.validateName,
  productsMiddlewares.validateQuantity,
  productsController.create,
);

router.put(
  '/:id',
  productsMiddlewares.validateName,
  productsMiddlewares.validateQuantity,
  productsController.update,
);

router.delete(
  '/:id',
  productsController.remove,
);

module.exports = router;