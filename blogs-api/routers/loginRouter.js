const express = require('express');

const router = express.Router();

const loginMiddlewares = require('../middlewares/loginMiddlewares');
const loginController = require('../controllers/loginController');

router.post(
  '/',
  loginMiddlewares.validateEmail,
  loginMiddlewares.validatePassword,
  loginController.login,
);

module.exports = router;