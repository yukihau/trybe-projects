const express = require('express');
const validator = require('../middlewares/validator');
const authentication = require('../schemas/authentication');

const router = express.Router();

const controller = require('../controller/authentication');
const authenticationRegister = require('../schemas/authentication-register');

router.post(
  '/login',
  validator(authentication),
  controller.login,
);

router.post('/register', validator(authenticationRegister), controller.register);

module.exports = router;
