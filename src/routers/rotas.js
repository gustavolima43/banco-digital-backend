const express = require('express');
const {camposObrigatorios, usuarioExistente, validarSenha, validarConta, camposObrigatoriosTransacoes, encontrarConta, camposObrigatoriosNumeroSenha } = require('../middlewares/intermediarios')
const contas = require('../controllers/contas');
const transacoes = require('../controllers/transacoes');
const rotas = express();

rotas.get('/contas', validarSenha, contas.listarContas);
rotas.post('/contas', camposObrigatorios, usuarioExistente, contas.criarConta);
rotas.put('/contas/:numeroConta/usuario', camposObrigatorios, usuarioExistente, contas.atualizarConta);
rotas.delete('/contas/:numeroConta', contas.deleteConta);

rotas.post('/trasacoes/depositar', camposObrigatoriosTransacoes, encontrarConta, transacoes.depositar);
rotas.post('/transacoes/sacar', camposObrigatoriosTransacoes, encontrarConta, transacoes.sacar);
rotas.post('/transacoes/transferir', transacoes.transferir);
rotas.get('/contas/saldo', camposObrigatoriosNumeroSenha, validarConta,  transacoes.saldo);
rotas.get('/contas/extrato', camposObrigatoriosNumeroSenha, validarConta, transacoes.extrato);


module.exports = rotas;