// Responsável por iniciar o servidor importando as rotas e o banco de dados.

const express = require('express');

const app = express();

const routes = require('./routes');

const migrationsRun = require('./app/database/sqlite/migrations');

migrationsRun(); 

app.use(express.json());
app.use(routes);

app.listen(3000, () => {
  console.log('Estou Funcionando');
});