const bancoDeDados = require('../data/bancoDeDados');
let {contas} = require('../data/bancoDeDados');

const listarContas = (req, res) => {
    res.json(contas)
}

const criarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json('Todos os campos são obrigatórios')
    }
    
        
    let criandoConta = {
            numero: contas.length + 1,
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
    // const contaCPF = contas.find(conta => conta.usuario.cpf === criandoConta.usuario.cpf);
    // const contaEmail = contas.find(conta => conta.usuario.email === criandoConta.usuario.email);

    // if(contaCPF || contaEmail) return res.json({mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})

    contas.push(criandoConta);
    return res.status(201).json(criandoConta.usuario);
}

const atualizarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const {numeroConta} = req.params;
    
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json('Todos os campos são obrigatórios')
    }
    // const contaCPF = contas.find(conta => conta.usuario.cpf === criandoConta.usuario.cpf);
    // const contaEmail = contas.find(conta => conta.usuario.email === criandoConta.usuario.email);

    // if(contaCPF || contaEmail) return res.json({mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})
    
    const conta = contas.find(conta => conta.numero == numeroConta);

    
    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(200).json(conta);
}

const deleteConta = (req, res) => {
    const {numeroConta} = req.params;
    const conta = contas.find(conta => conta.numero == numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta não existe.' });
    }
    console.log('chegou')
    if(conta.saldo > 0) {
        return res.status(404).json({mensagem: "A conta só pode ser removida se o saldo for zero!"})
    }
    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });

    return res.status(204).send();
}

const depositar = (req, res) => {
    const {numero_conta, valor} = req.body;
    
    if (!numero_conta || !valor) {
        return res.status(400).json({mensagem: "O número da conta e o valor são obrigatórios!"});
    }

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

    bancoDeDados.depositos.push(deposito);

    res.status(200).json(deposito)
}

const sacar = (req, res) => {
    const {numero_conta, valor, senha} = req.body;
    
    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({mensagem: "O número da conta e o valor são obrigatórios!"});
    }

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

    return res.send()

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

    bancoDeDados.transferencias.push(registro);
    return res.send()
}

const saldo = (req, res) => [
    
]


module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deleteConta,
    depositar,
    sacar,
    transferir,
    saldo
}