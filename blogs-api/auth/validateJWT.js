require('dotenv').config();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const jwtSecret = process.env.JWT_SECRET;

const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Expired or invalid token';

const validate = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: TOKEN_NOT_FOUND });
  }

  try {
    const { data: { email } } = jwt.verify(token, jwtSecret);
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: INVALID_TOKEN });
    delete user.password;
    req.userId = user.id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: INVALID_TOKEN });
  }
};

module.exports = validate;
