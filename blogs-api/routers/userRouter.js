const express = require('express');

const router = express.Router();

const userMiddlewares = require('../middlewares/userMiddlewares');
const userController = require('../controllers/userController');
const validateJWT = require('../auth/validateJWT');

router.post(
  '/',
  userMiddlewares.validateName,
  userMiddlewares.validateEmail,
  userMiddlewares.validatePassword,
  userController.create,
);

router.get(
  '/',
  validateJWT,
  userController.getAll,
);
router.get(
  '/:id',
  validateJWT,
  userController.getById,
);

module.exports = router;
