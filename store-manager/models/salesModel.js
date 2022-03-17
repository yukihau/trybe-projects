const connection = require('../connection');

const getAll = async () => {
  const [result] = await connection.execute(
    `SELECT
      sp.sale_id,
      sa.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales_products sp
      INNER JOIN StoreManager.sales sa ON sp.sale_id = sa.id
    GROUP BY sp.sale_id, sp.product_id, sp.quantity, sa.date
    ORDER BY sp.sale_id, sp.product_id ASC`,
  );
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    `SELECT
      sa.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales_products sp
      INNER JOIN StoreManager.sales sa ON sp.sale_id = sa.id
    WHERE sp.sale_id = ?
    GROUP BY sp.sale_id, sp.product_id, sp.quantity, sa.date
    ORDER BY sp.sale_id, sp.product_id ASC;`,
    [id],
  );
  if (!result.length) return null;
  return result;
};

const createSale = async () => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );
  return result.insertId;
};

const createSaleProduct = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
    VALUES (?, ?, ?)`,
    [saleId, productId, quantity],
  );
  return { saleId, productId, quantity };
};

const update = async ({ saleId, productId, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.sales_products
    SET product_id = ?, quantity = ?
    WHERE sale_id = ?;`,
    [productId, quantity, saleId],
  );
  return { productId, quantity, saleId };
};

module.exports = {
  getAll,
  getById,
  createSale,
  createSaleProduct,
  update,
};
