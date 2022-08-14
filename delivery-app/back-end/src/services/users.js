const { User } = require('../database/models');

module.exports = {
  async findAll() {
    const user = await User.findAll({
      exclude: [
        'password',
      ],
    });
    return user;
  },
};
