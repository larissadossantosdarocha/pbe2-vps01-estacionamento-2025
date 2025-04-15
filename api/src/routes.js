const express = require('express');
const routes = express.Router();


const Automovel = require('./controllers/automovel.js');
const Estadia = require('./controllers/estadia.js');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Estacionamento ACME' });
});

routes.post('/a', Aluno.create);
routes.get('/a', Aluno.read);
routes.get('/a/:id', Aluno.readOne);
routes.patch('/a/:id', Aluno.update);
routes.delete('/a/:id', Aluno.remove);

routes.post('/t', Telefone.create);
routes.get('/t', Telefone.read);
routes.get('/t/:id', Telefone.readOne);
routes.patch('/t/:id', Telefone.update);
routes.delete('/t/:id', Telefone.remove);


module.exports = routes;