// Define as rotas da aplicação. 
// E permite acessar os métodos de CRUD de categorias e produtos.

const { Router } = require('express');

const ProductController = require('./app/controllers/ProductController');
const CategoryController = require('./app/controllers/CategoryController');

const router = Router();

router.get('/categorias', CategoryController.index);
router.get('/categorias/:id', CategoryController.show);
router.delete('/categorias/:id', CategoryController.deleteCategory);
router.post('/categorias', CategoryController.createCategory);
router.put('/categorias/:id', CategoryController.updateCategory);

router.get('/produtos', ProductController.index);
router.get('/produtos/:id', ProductController.show);
router.delete('/produtos/:id', ProductController.delete);
router.post('/produtos', ProductController.store);
router.put('/produtos/:id', ProductController.update);

module.exports = router;
