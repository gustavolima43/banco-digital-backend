let {contas, identificadorConta} = require('../data/bancoDeDados');

const listarContas = (req, res) => {
    res.status(200).json(contas)
}

const criarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;    
    let criandoConta = {
            numero: identificadorConta++,
            saldo: 0,
            usuario: {
                nome, 
                cpf, 
                data_nascimento, 
                telefone, 
                email, 
                senha,
            }
            
    }
    
    contas.push(criandoConta);
    return res.status(201).json();
}

const atualizarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;  
    const {numeroConta} = req.params;
           
    const conta = contas.find(conta => conta.numero == numeroConta);

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).send();
}

const deleteConta = (req, res) => {
    const {numeroConta} = req.params;
    const conta = contas.find(conta => conta.numero == numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta não existe.' });
    }
    if(conta.saldo > 0) {
        return res.status(404).json({mensagem: "A conta só pode ser removida se o saldo for zero!"})
    }
    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    return res.status(204).send();
}


module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deleteConta    
}