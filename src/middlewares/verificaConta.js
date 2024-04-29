const {contas} = require('../data/bancoDeDados');

const {numeroConta} = req.params;
    const conta = contas.find(conta => conta.numero == numeroConta);
    if (!conta) {
        return res.status(404).json({ mensagem: 'A conta não existe.' });
    }