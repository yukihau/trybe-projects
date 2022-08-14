const { findAll } = require('../services/users');

const SERVER_ERROR = { message: 'Server error' };

module.exports = {
  async findAll(_req, res) {
    try {
      const users = await findAll();
      return res.status(200).json(users);
    } catch (e) {
      console.log(e);
      return res.status(500).json(SERVER_ERROR);
    }
  },
};
