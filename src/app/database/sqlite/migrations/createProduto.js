const {v4: uuidv4} = require('uuid');

const createProduto = `
    CREATE TABLE IF NOT EXISTS produto (
        id TEXT PRIMARY KEY,
        nome TEXT NOT NULL,
        preco REAL NOT NULL,
        categoria_id TEXT NOT NULL,
        subcategoria TEXT NOT NULL,
        FOREIGN KEY (categoria_id) REFERENCES categoria(id)
    );
`

module.exports = createProduto;