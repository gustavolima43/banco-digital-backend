const {contas, identificarUsuario} = require('../data/bancoDeDados');

const listarContas = (req, res) => {
    res.json(contas)
}

const criarConta = (req, res) => {
    const {nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json('Todos os campos são obrigatórios')
    }
    
        
    let organizarContas = {
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
        

    console.log('chegou')
    contas.push(organizarContas);
    return res.status(201).json(organizarContas.usuario);
}
    


    




module.exports = {
    listarContas,
    criarConta
}