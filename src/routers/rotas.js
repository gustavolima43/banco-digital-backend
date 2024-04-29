const express = require('express');
const { validarSenha } = require('../middlewares/autentificador');
const { usuarioExistente } = require('../middlewares/usuarioExistente')
const controlador = require('../controllers/controlador');
const rotas = express();

rotas.get('/contas', validarSenha, controlador.listarContas);
rotas.post('/contas', usuarioExistente, controlador.criarConta);
rotas.put('/contas/:numeroConta/usuario', usuarioExistente, controlador.atualizarConta)


module.exports = rotas;