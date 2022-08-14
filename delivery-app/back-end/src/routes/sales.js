const express = require('express');

const routerSales = express.Router();
const validator = require('../middlewares/validator');
const controller = require('../controller/sales');
const checkout = require('../schemas/checkout');
const loginValidator = require('../middlewares/loginValidator');

routerSales.get(
  '/sales',
  controller.findAll,
);

routerSales.get(
  '/sales/:id',
  controller.findById,
);

routerSales.put(
  '/sales/:id',
  controller.update,
);

routerSales.get('/customer/orders', loginValidator, controller.findAllByUser);

routerSales.post('/customer/checkout', validator(checkout), controller.create);

module.exports = routerSales;