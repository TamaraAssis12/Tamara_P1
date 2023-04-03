// Gerencia as operações de CRUD de categorias. 
// Ele é responsável por receber as requisições e enviar as respostas para o cliente. 
// Para isso, ele importa o CategoryRepository, que é responsável por fazer as operações no banco de dados. 

const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController{
    async index(request, response){
        const categories = await CategoryRepository.getAll();
        response.status(200).json(categories);
    }

    async show(request, response){
        const { id } = request.params;
        const category = await CategoryRepository.getById(id);
        if(!category){
            return response.status(404).json({error: 'Categoria não encontrada'});
        }
        response.status(200).json(category);
    }

    async createCategory(request, response){ 
        const { name } = request.body;
        if (!name) { 
            return response.status(400).json({ error: "Categoria cadastrada sem nome" }) 
          }
        const category = await CategoryRepository.create({name}); 
        response.status(201).json(category);
    }

    async updateCategory(request, response){ 
        const { id } = request.params;
        const { name } = request.body;

        const categoryExists = await CategoryRepository.getById(id);

        if(!categoryExists){
            return response.status(404).json({error: 'Categoria não encontrada'});
        }
        
        if(!name){
            return response.status(400).json({error: 'Nome precisa ser preenchido ou válido'});
        }

        const category = await CategoryRepository.update(id, {name});

        response.status(200).json(category);

    }

    async deleteCategory(request, response){ 
        const { id } = request.params;

        const category = await CategoryRepository.getById(id);

        if(!category){
            return response.status(403).json({error: 'Categoria não encontrada'});
        }

        await CategoryRepository.delete(id);

        response.sendStatus(204);
    }
}

module.exports = new CategoryController();
