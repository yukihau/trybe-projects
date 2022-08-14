const md5 = require('md5');
const { User } = require('../database/models');

module.exports = {
  async login(data) {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return { status: 404, message: 'User not found' };
    }

    const isValid = md5(data.password) === user.password;

    if (!isValid) {
      return { status: 400, message: 'Invalid password' };
    }

    const userDetails = { 
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return userDetails;
  },

  async register(data) {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return { status: 400, message: 'User already exists' };
    }

    const userDetails = { 
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const newUser = await User.create({
      ...userDetails,
      password: md5(data.password),
    });

    return newUser;
  },
};
