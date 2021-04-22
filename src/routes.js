// Chamando biblioteca pra criar servidor(express)
const express = require('express');
// Express criando as rotas
const routes = express.Router();
// Importando o ProfileController
const ProfileController = require('./controllers/ProfileController')
// Importando o JobController
const JobController = require('./controllers/JobController');
// Importando o Dash
const DashbordController = require('./controllers/DashbordController');

// ===============================================================

// Rotas
routes.get('/', DashbordController.index)
routes.get('/job', JobController.create);
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show);
routes.post('/job/:id', JobController.update);
routes.post('/job/delete/:id', JobController.delete);
routes.get('/profile', ProfileController.index);
routes.post('/profile', ProfileController.update);

// OBS: Ejs reconhece a pasta views
// Exportando as rotas para serem usadas no servidor(server.js)
module.exports = routes;



