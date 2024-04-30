const express = require('express');
const { validarSenha } = require('../middlewares/autentificador');
const { validarConta } = require('../middlewares/intermediarios')
const { usuarioExistente } = require('../middlewares/usuarioExistente')
const contas = require('../controllers/contas');
const transacoes = require('../controllers/transacoes');
const rotas = express();

rotas.get('/contas', validarSenha, contas.listarContas);
rotas.post('/contas', usuarioExistente, contas.criarConta);
rotas.put('/contas/:numeroConta/usuario', usuarioExistente, contas.atualizarConta);
rotas.delete('/contas/:numeroConta', contas.deleteConta);

rotas.post('/trasacoes/depositar', transacoes.depositar);
rotas.post('/transacoes/sacar', transacoes.sacar)
rotas.post('/transacoes/transferir', transacoes.transferir)
rotas.get('/contas/saldo', validarConta, transacoes.saldo)


module.exports = rotas;