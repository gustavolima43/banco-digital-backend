const { contas, saques, depositos, transferencias }= require('../data/bancoDeDados');

const depositar = (req, res) => {
    const {numero_conta, valor} = req.body;
    
    if(valor <= 0) {
        return res.status(404).json();
    }

    const conta = contas.find(conta => conta.numero === Number(numero_conta));
    
    conta.saldo += valor;

    let deposito = {
        data: new Date().toISOString(),
        numero_conta,
        valor
    }

    depositos.push(deposito);

    return res.status(200).json();
}

const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body;

    const conta = contas.find(conta => conta.numero === Number(numero_conta));

    if(valor < 0) {
        return res.status(404).json({mensagem: "O valor não pode ser menor que zero!"})
    }

    if(conta.usuario.saldo < valor){
        return res.status(400).json({mensagem: "Saldo insuficiente!"});
    } else {
        conta.saldo -= valor;
    }
    const saque = {
        data: new Date().toISOString(),
        numero_conta: numero_conta,
        valor: valor,
    }

    saques.push(saque);

    return res.status(200).send();

}

const transferir = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.body;

    const conta_origem = contas.find(conta => conta.numero === Number(numero_conta_origem));
    const conta_destino = contas.find(conta => conta.numero === Number(numero_conta_destino));

    if (conta_origem === conta_destino) {
        return res.status(404).json({mensagem: "Não é possível realizar essa transação"})
    }
    
    if(!conta_origem || !conta_destino) {
        return res.status(404).json({mensagem: "Conta inexistente!"});
    }

    if(conta_origem.usuario.senha !== senha) {
        return res.staus(404).json({mensagem: "Senha incorreta!"});
    }
    if(valor > conta_origem.saldo){
        return res.status(404).json({mensagem: "Saldo insuficiente!"})
    }
    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;

    let registro = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    }

    transferencias.push(registro);
    return res.status(200).send();
}

const saldo = (req, res) => {
    const { numero_conta } = req.query;
    const conta = contas.find(conta => conta.numero == numero_conta);

    return res.status(200).json(`saldo: ${conta.saldo}`);
    
}
const extrato = (req, res) => {
    const { numero_conta } = req.query;

    const extrato = {
        depositos: depositos.filter(deposito => deposito.numero_conta === numero_conta),
        saques: saques.filter(saque => saque.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)
    }
    return res.status(200).json({extrato});


}
module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}