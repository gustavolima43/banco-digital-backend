const { banco, contas }= require('../data/bancoDeDados');

const camposObrigatorios = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json('Todos os campos são obrigatórios')
    }

    next();
}
const usuarioExistente = (req, res, next) => {
    const {cpf, email} = req.body;
    const contaCPF = contas.find(conta => conta.usuario.cpf === cpf);
    const contaEmail = contas.find(conta => conta.usuario.email === email);
    console.log('entrou')
    if(contaCPF || contaEmail) return res.json({mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})
    
    next()

}
const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;

    if(!senha_banco) {
        return res.json('Senha não informada');
    }

    if(senha_banco !== banco.senha) {
        return res.json({mensagem: "A senha do banco informada é inválida!"});
    }

    next();
}


const validarConta = (req, res, next) => {
    const { numero_conta } = req.query;
    const { senha } = req.query;
    const conta = contas.find((conta) => conta.numero === Number(numero_conta));
   
    if(!conta) {
        return res.status(404).json({mensagem: "Conta não encontrada"});
    }

    if(conta.usuario.senha === senha) {
        next()
    } else {
        return res.status(404).json({mensagem: "Senha incorreta."})
    }
}

const camposObrigatoriosTransacoes = (req, res) => {
    const {numero_conta, valor} = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({mensagem: "O número da conta e o valor são obrigatórios!"});
    }
}


module.exports = {
    camposObrigatorios,
    usuarioExistente,
    validarSenha,
    validarConta,
    camposObrigatoriosTransacoes
}

