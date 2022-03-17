const connection = require('../connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?;',
    [id],
  );
  if (!result.length) return null;
  return result[0];
};

const getByName = async (name) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name = ?;',
    [name],
  );
  if (!result.length) return null;
  return result[0];
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);',
    [name, quantity],
  );
  return { id: result.insertId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.products
    SET name = ?, quantity = ?
    WHERE id = ?;`,
    [name, quantity, id],
  );
  return { id, name, quantity };
};

const remove = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [id],
  );
  return true;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  remove,
};
