const express = require('express');
const { productsGetAll } = require('../controller/customer');

const router = express.Router();

const loginValidator = require('../middlewares/loginValidator');

router.get(
  '/customer/products',
  loginValidator,
  productsGetAll,
);

module.exports = router;
