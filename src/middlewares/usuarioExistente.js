const {contas} = require('../data/bancoDeDados');

const usuarioExistente = (req, res, next) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    const contaCPF = contas.find(conta => conta.usuario.cpf === cpf);
    const contaEmail = contas.find(conta => conta.usuario.email === email);
    console.log('entrou')
    if(contaCPF || contaEmail) return res.json({mensagem: "Já existe uma conta com o cpf ou e-mail informado!"})
    
    next()

}

module.exports = {
    usuarioExistente
}