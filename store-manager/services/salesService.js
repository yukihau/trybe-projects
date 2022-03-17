const salesModel = require('../models/salesModel');

const NOT_FOUND = 'Sale not found';

const intoCamelCase = (obj) => ({
  saleId: obj.sale_id,
  productId: obj.product_id,
  quantity: obj.quantity,
  date: obj.date,
});

const getAll = async () => {
  const result = await salesModel.getAll();
  return { code: 200, data: result.map(intoCamelCase) };
};

const getById = async (id) => {
  const result = await salesModel.getById(id);
  if (!result) return { code: 404, data: { message: NOT_FOUND } };
  return { code: 200, data: result.map(intoCamelCase) };
};

const create = async (items) => {
  const saleId = await salesModel.createSale();
  const result = { id: saleId, itemsSold: items };
  items.forEach(async (item) => {
    const { productId, quantity } = item;
    await salesModel.createSaleProduct({ saleId, productId, quantity });
  });
  return { code: 201, data: result };
};

const update = async (saleId, items) => {
  const result = { saleId, itemUpdated: items };
  items.forEach(async (item) => {
    const { productId, quantity } = item;
    await salesModel.update({ saleId, productId, quantity });
  });
  return { code: 200, data: result };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};
