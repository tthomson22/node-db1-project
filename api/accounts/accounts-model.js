const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
  //SELECT * FROM accounts;
  return db('accounts');
}

const getById = id => {
  // DO YOUR MAGIC
  // SELECT * FROM accounts WHERE id = ?;
  return db('accounts')
    .where('id', id)
    .first();
}

const create = async account => {
  // DO YOUR MAGIC
  // INSERT INTO accounts (name, budget) VALUES(? ,?);
  let [id] = await db('accounts')
    .insert(account);
  return getById(id);
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  // UPDATE accounts SET name = ?, budget = ? WHERE id = ?;
  await db('accounts').where('id', id).update(account);
  return getById(id);
}

const deleteById = async id => {
  // DO YOUR MAGIC
  // DELETE FROM accounts WHERE id = ?;
  let result = await getById(id);
  await db('accounts').where('id', id).del();
  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
