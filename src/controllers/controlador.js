const {contas} = require('../data/bancoDeDados');

const listarContas = (req, res) => {
    res.json(contas)
}

module.exports = {
    listarContas,
}