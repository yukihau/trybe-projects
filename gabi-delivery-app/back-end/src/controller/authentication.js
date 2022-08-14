const token = require('../helpers/token');
const service = require('../services/authentication');

module.exports = {
  async login(req, res) {
    try {
      const data = await service.login(req.body);
      if (data.status) return res.status(data.status).json({ error: data.message });
      const generatedToken = token.generate(data.email, data.role);
      return res.status(200).json({ ...data, token: generatedToken });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Server error' });
    }
  },

  async register(req, res) {
    try {
      const data = await service.register(req.body);
      if (data.status) return res.status(data.status).json({ error: data.message });
      const generatedToken = token.generate(data.email, data.role);
      return res.status(200).json({ ...data, token: generatedToken });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: 'Server error' });
    }
  },
};
