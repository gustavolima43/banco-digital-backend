const { contas }= require('../data/bancoDeDados');


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

module.exports = {
    validarConta
}

