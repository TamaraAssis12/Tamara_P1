// Gerencia as operações de CRUD de Produtos. 
// Ele é responsável por receber as requisições e enviar as respostas para o cliente.
// Para isso, ele importa o ProductsRepository, que é responsável por fazer as operações no banco de dados.

const ProductsRepository = require('../repositories/ProductsRepository');

class ProductController {
  async index(request, response) {
    const products = await ProductsRepository.findAll();

    response.json(products);
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.status(404).json({ error: 'Produto não encontrado' });
    }
    response.json(product);
  }

  async store(request, response) {
    const { nome, preco, categoria_id, subcategoria } = request.body;

    if (!nome) {
      return response.status(400).json({ error: "Produto cadastrado sem nome" })
    }
    const product = await ProductsRepository.create({
      nome, preco, categoria_id, subcategoria,
    });
    response.json(product);
  }

  async update(request, response) { 
    const { id } = request.params;
    const { nome, preco, categoria_id, subcategoria } = request.body;
    
    const productExists = await ProductsRepository.findById(id);
    if (!productExists) {
      return response.status(404).json({ error: "Não existe produto com esse id cadastrado" });
    }
    if (!nome) {
      return response.status(400).json({ error: "Nome precisa ser preenchido ou válido" });
    }
    const product = await ProductsRepository.update(id, {
      nome, preco, categoria_id, subcategoria
    });
    response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      return response.status(403).json({ error: "Produto Não Encontrado" });
    }
    await ProductsRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ProductController();
