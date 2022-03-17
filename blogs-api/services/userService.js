require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// Messages
const USER_EXISTS = 'User already registered';
const USER_DOES_NOT_EXIST = 'User does not exist';

// JWT
const jwtSecret = process.env.JWT_SECRET;
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

// Validations
const validateIfUserExists = async (user) => {
  const userExists = await User.findAll({ where: { email: user.email } });

  if (userExists.length !== 0) return { code: 409, data: { message: USER_EXISTS } };

  return false;
};

// Services
const create = async (user) => {
  const userExists = await validateIfUserExists(user);

  if (userExists) return userExists;

  await User.create(user);

  const token = jwt.sign({ data: user }, jwtSecret, jwtConfig);

  return { code: 201, data: { token } };
};

const getAll = async () => {
  const result = await User.findAll({ exclude: 'password' });

  return { code: 200, data: result };
};

const getById = async (id) => {
  const user = await User.findOne({ where: { id } });

  if (!user) return { code: 404, data: { message: USER_DOES_NOT_EXIST } };

  return { code: 200, data: user };
};

module.exports = { create, getAll, getById };
