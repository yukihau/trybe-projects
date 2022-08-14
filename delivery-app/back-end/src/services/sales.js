const { Sale, User, SaleProduct } = require('../database/models');

const NOT_FOUND = 'Sale not found';

const createSaleProduct = async ({ quantity, saleId, productId }) => {
  await SaleProduct.create({ quantity, saleId, productId });
};

module.exports = {
  async findAll() {
    return Sale.findAll({
      include: [
        { all: true },
      ],
    });
  },

  async findById(id) {
    const user = await Sale.findOne({ where: { id }, include: { all: true } });
    return user || { status: 404, error: NOT_FOUND };
  },

  async findAllByUser(email) {
    const user = await User.findOne({ where: { email } });
    return user ? Sale.findAll({ where: { userId: user.id }, include: [{ all: true }] })
      : { status: 404, error: NOT_FOUND };
  },

  async create(data) {
    const sale = await Sale.create({ ...data, status: 'Pendente' });
    Promise.all(data.products.map(({ id: productId, quantity }) =>
      createSaleProduct({ productId, quantity, saleId: sale.id })));
    return sale;
  },

  async update(id, status) {
    const sale = await Sale.findOne({ where: { id } });
    if (!sale) return { status: 404, error: NOT_FOUND };
    await sale.update({ status });
    return sale;
  },
};