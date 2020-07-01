const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();

router.post('/registrarDeposito', async(req, res) => {
    const { agencia, conta, balance } = req.body;

    try {
        const dados = await Conta.findOne({ conta });

        if (dados){
            const newBalance = balance + dados.balance;
            await Conta.updateOne({ agencia, conta }, { $inc: { "balance": balance }});
            
            return res.send(`Seu saldo atual é ${newBalance}`);
        } else {
            return res.status(400).send({ error: 'Conta não encontrada'});
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);