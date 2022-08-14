const md5 = require('md5');
const { User } = require('../database/models');

module.exports = {
  async login(data) {
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) return { status: 404, error: 'User not found' };

    const isValid = md5(data.password) === user.password;
    if (!isValid) return { status: 400, error: 'Invalid password' };

    return { id: user.id, name: user.name, email: user.email, role: user.role };
  },

  async register(data) {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) return { status: 409, error: 'User already exists' };

    const newUser = await User.create({
      ...data,
      role: 'customer',
      password: md5(data.password),
    });

    return {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    };
  },
};
