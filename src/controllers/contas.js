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




module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deleteConta    
}