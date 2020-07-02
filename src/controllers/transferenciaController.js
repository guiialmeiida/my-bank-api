const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();
//nok
router.post('/transferencia', async(req, res) => {
    const { origem, destino, valorTransferencia } = req.body;

    try {
        const contaOrigem = await Conta.findOne({ conta : origem });
        const contaDestino = await Conta.findOne({ conta: destino });

        if (contaOrigem.agencia == contaDestino.agencia){

            const newValorTransferencia = contaOrigem.balance - valorTransferencia;
            
            await Conta.findOneAndUpdate({ conta: origem }, { $set: { "balance": newValorTransferencia }});
            await Conta.findOneAndUpdate({ conta: destino }, { $inc: { "balance": valorTransferencia }});
           
            return res.send(`Seu saldo atual é  R$${newValorTransferencia}`);

        } else {
            
            const newValorTransferencia = contaOrigem.balance - valorTransferencia - 8;

            await Conta.updateOne({ contaOrigem }, { $set: { "balance": newValorTransferencia }});
            await Conta.updateOne({ contaDestino }, { $inc: { "balance": valorTransferencia }});

            return res.send(`Seu saldo atual é  R$${newValorTransferencia}`);
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);