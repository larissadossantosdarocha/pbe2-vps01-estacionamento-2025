const express = require('express');
const routes = express.Router();


const Automovel = require('./controllers/automovel.js');
const Estadia = require('./controllers/estadia.js');

routes.get('/', (req, res) => {
  return res.json({ titulo: 'Estacionamento ACME' });
});

routes.post('/automovel', Automovel.create);
routes.get('/automovel', Automovel.read);
routes.get('/automovel/:id',  Automovel.readOne);
routes.patch('/automovel/:id',  Automovel.update);
routes.delete('/automovel/:id',  Automovel.remove);

routes.post('/estadia', Estadia.create);
routes.get('/estadia', Estadia.read);
routes.get('/estadia/:id', Estadia.readOne);
routes.patch('/estadia/:id', Estadia.update);
routes.delete('/estadia/:id', Estadia.remove);


module.exports = routes;