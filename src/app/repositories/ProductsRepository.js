const sqliteConnection = require('../database/sqlite');
const { v4 } = require('uuid');


class ProductsRepository {
  async findAll() {
    const db = await sqliteConnection();
    const products = await db.all('SELECT * FROM produto');

    db.close();

    return products;
  }

  async findById(id) {
    const db = await sqliteConnection();
    const product = await db.get(`SELECT * FROM produto WHERE id = '${id}'`);
    db.close();
    return product;
  }

  async delete(id) {
   const db = await sqliteConnection();
    await db.run(`DELETE FROM produto WHERE id = '${id}'`);
    db.close();

  }

  async create({ nome, preco, categoria_id, subcategoria, }) {
    const id = v4();
    const db = await sqliteConnection();
    await db.run(`INSERT INTO produto(id, nome, preco, categoria_id, subcategoria) VALUES('${id}', '${nome}', '${preco}', '${categoria_id}', '${subcategoria}')`);
    db.close();
    return this.findById(id);

  }

  async update(id, { nome, preco, categoria_id, subcategoria, }) {
    const db = await sqliteConnection();

    const updates = {
      nome,
      preco,
      categoria_id,
      subcategoria,
    };

    const query = 'UPDATE produto SET ' +
  Object.keys(updates)
    .filter(key => updates[key] !== undefined)
    .map(key => `${key} = ?`)
    .join(', ') +
  ' WHERE id = ?';

  const values = Object.values(updates)
  .filter(value => value !== undefined)
  .concat(id);

  await db.run(query, values);
  db.close();
  return this.findById(id);
    
  }
}

module.exports = new ProductsRepository();
