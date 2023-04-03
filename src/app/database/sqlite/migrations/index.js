// Responsável por criar o banco de dados e as tabelas.

const sqliteConnection = require('../../sqlite');
const createProduto = require('./createProduto');
const createCategoria = require('./createCategoria');

async function migrationsRun() {
    const schemas = [createCategoria, createProduto].join('');
    
    sqliteConnection().then(
        db => db.exec(schemas)
    ).catch(err => console.log(err));
}

module.exports = migrationsRun;