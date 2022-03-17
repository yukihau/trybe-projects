const express = require('express');

const salesMiddlewares = require('../middlewares/salesMiddlewares');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get(
  '/', 
  salesController.getAll,
);

router.get(
  '/:id',
  salesController.getById,
);

router.post(
  '/',
  salesMiddlewares.validateProductId,
  salesMiddlewares.validateQuantity,
  salesController.create,
);

router.put(
  '/:id',
  salesMiddlewares.validateProductId,
  salesMiddlewares.validateQuantity,
  salesController.update,
);

module.exports = router;