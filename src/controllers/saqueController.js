const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();

router.post('/registrarSaque', async(req, res) => {
    const { agencia, conta, saque } = req.body;

    try {
        const dados = await Conta.findOne({ conta });

        if(dados){
            const validaBalance = dados.balance - saque - 1;

            if (validaBalance > 0) {
                await Conta.updateOne({ agencia, conta }, { $set: { "balance": validaBalance }});
                
                return res.send(`Seu saldo atual é R$${validaBalance}`);
            } else {
                return res.status(400).send({ error: 'Seu saldo não pode ser negativo!'});
            }
        } else {
                return res.status(400).send({ error: 'Conta não encontrada'});
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);