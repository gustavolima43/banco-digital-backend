const express = require('express');
const { validarSenha } = require('../middlewares/autentificador');
const controlador = require('../controllers/controlador');
const rotas = express();

rotas.get('/contas', validarSenha, controlador.listarContas);



module.exports = rotas;