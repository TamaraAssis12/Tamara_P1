// Define um repositório de categorias. 
// Ele é responsável por exportar os métodos para acessar e manipular os dados do banco de dados.

const sqliteConnection = require('../database/sqlite');
const {v4: uuidv4} = require('uuid');

class CategoryRepository{
    async create(category){ 
        const db = await sqliteConnection();
        const idCategory = uuidv4();
        await db.run(`INSERT INTO categoria(id, nome) VALUES('${idCategory}', '${category.name}')`);
        db.close();
        return this.getById(idCategory);
       
    }

    async getAll(){
        const db = await sqliteConnection();
        const categories = await db.all('SELECT * FROM categoria');
        return categories;
    }

    async getById(id){
        const db = await sqliteConnection();
        
        const category = await db.get(`SELECT * FROM categoria WHERE id = '${id}'`);
        db.close();
        return category;
    }

    async update(id, category){
        const db = await sqliteConnection();
        const categories = await db.run(`UPDATE categoria SET nome = '${category.name}' WHERE id = '${id}'`);
        db.close();
        return this.getById(id);

    }

    async delete(id){
        const db = await sqliteConnection();
        await db.run(`DELETE FROM categoria WHERE id = '${id}'`);
        db.close();
    }
}

module.exports = new CategoryRepository();