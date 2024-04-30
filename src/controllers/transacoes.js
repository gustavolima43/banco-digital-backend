
const { contas, saques, depositos, transferencias }= require('../data/bancoDeDados');

const depositar = (req, res) => {
    const {numero_conta, valor} = req.body;

    const conta = contas.find(conta => conta.numero == numero_conta);
    
    if(valor <= 0) {
        return res.status(404).json();
    }
    
    conta.saldo += valor;

    let deposito = {
        data: new Date(),
        numero_conta,
        valor
    }

    depositos.push(deposito);

    res.status(200).json(deposito);
}

const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body;

    const conta = contas.find(conta => conta.numero === numero_conta);

    if(!conta) {
        return res.json({mensagem: "Essa conta não existe!"})
    }

    const acesso = contas.find(conta => conta.usuario.senha === senha);

    if(!acesso) return res.json({mensagem: "Senha incorreta!"})

    if(valor < 0) {
        return res.json({mensagem: "O valor não pode ser menor que zero!"})
    }

    if(conta.usuario.saldo < valor){
        return res.json({mensagem: "Saldo insuficiente!"});
    } else {
        conta.saldo -= valor;
    }
    const saque = {
        data: new Date(),
        numero_conta: numero_conta,
        valor: valor,
    }

    saques.push(saque);

    return res.send();

}

const transferir = (req, res) => {
    const {numero_conta_origem, numero_conta_destino, valor, senha} = req.params;

    const conta_origem = contas.find(conta => conta.numero === numero_conta_origem);
    const conta_destino = contas.find(conta => conta.numero === numero_conta_destino);
    if(!conta_origem || !conta_destino) {
        return res.json({mensagem: "Conta inexistente!"});
    }

    if(conta_origem.usuario.senha !== senha) {
        return res.json({mensagem: "Senha incorreta!"});
    }

    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;

    let registro = {
        data: new Date(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    }

    transferencias.push(registro);
    return res.send()
}

const saldo = (req, res) => {
    const { numero_conta } = req.query;
    const conta = contas.find(conta => conta.numero == numero_conta);

    return res.status(200).json(`saldo: ${conta.saldo}`);
    
}
const extrato = (req, res) => {
    const { numero_conta } = req.query;
    
    const depositosConta = depositos.filter(deposito => deposito.numero_conta === Number(numero_conta));
    const saquesConta = saques.filter(saque => saque.numero_conta === Number(numero_conta));
    const transferenciasEnviadas = transferencias.filter(transferencia => transferencia.numero_conta_origem === Number(numero_conta));
    const transferenciasRecebidas = transferencias.filter(transferencia => transferencia.numero_conta_destino === Number(numero_conta));

    return res.status(200).json({
        "depositos": depositosConta,
        "saques": saquesConta,
        "transferenciasEnviadas": transferenciasEnviadas,
        "transferenciasRecebidas": transferenciasRecebidas
    })


}
module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}