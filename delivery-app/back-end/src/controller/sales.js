const { findAll, findById, create, findAllByUser, update } = require('../services/sales');

const SERVER_ERROR = { error: 'Server error' };

module.exports = {
  async findAll(req, res) {
    try {
      const sales = await findAll();
      return res.status(200).json(sales);
    } catch (e) {
      console.log(e);
      return res.status(500).json(SERVER_ERROR);
    }
  },

  async findById(req, res) {
    try {
      const data = await findById(Number(req.params.id));
      if (typeof data.status === 'number') {
        return res.status(data.status).json({ error: data.message });
      }
      return res.status(200).json(data);
    } catch (e) {
      return res.status(500).json(SERVER_ERROR);
    }
  },

  async create(req, res) {
    try {
      const sale = await create(req.body);
      return res.status(201).json(sale);
    } catch (e) {
      return res.status(500).json(SERVER_ERROR);
    }
  },

  async findAllByUser(req, res) {
   const { email } = req.user;

    try {
      const sales = await findAllByUser(email);
      return res.status(200).json(sales);
    } catch (e) {
      return res.status(500).json(SERVER_ERROR);
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
      const updated = await update(id, status);
      return res.status(200).json(updated);
    } catch (e) {
      return res.status(500).json(SERVER_ERROR);
    }
  },
};
