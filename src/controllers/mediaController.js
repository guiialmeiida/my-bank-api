const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();

router.get('/mediaClientes', async(req, res) => {
    const { agencia } = req.body;

    try {
        const dados = await Conta.findOne({ agencia });

        if (dados){
            const accounts = await Conta.aggregate([
                { $match: { agencia: dados.agencia } },
                { $group: { _id: "$agencia", balance: { $avg: "$balance" } } },
              ]);
            
            console.log(accounts[0].balance);
            return res.send(`O balance média da agéncia é R$${accounts[0].balance}`);
        } else {
            return res.status(400).send({ error: 'Agencia não encontrada'});
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);