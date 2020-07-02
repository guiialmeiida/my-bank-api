const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();

router.get('/consultaSaldo', async(req, res) => {
    const { agencia, conta } = req.body;

    try {
        const dados = await Conta.findOne({ conta });

        if (dados){
            
            const saldo = dados.balance;

            return res.send(`O saldo da sua conta é de R$${saldo}`);
        } else {
            return res.status(400).send({ error: 'Conta não encontrada'});
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);