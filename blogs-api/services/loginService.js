require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// Messages
const INVALID_FIELDS = 'Invalid fields';

// JWT
const jwtSecret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Validations
const validateIfUserDoesNotExist = async (user) => {
  const userExists = await User.findAll({ where: { email: user.email } });
  if (userExists.length === 0) return { code: 400, data: { message: INVALID_FIELDS } };
  return false;
};

// Services
const login = async (user) => {
  const userDoesNotExist = await validateIfUserDoesNotExist(user);

  if (userDoesNotExist) return userDoesNotExist;

  const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);

  return { code: 200, data: { token } };
};

module.exports = { login };
