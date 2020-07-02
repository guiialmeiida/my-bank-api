const express = require('express');
const Conta = require('../models/conta');

const router = express.Router();

router.delete('/deletarConta', async(req, res) => {
    const { agencia, conta } = req.body;

    try {
        const dados = await Conta.findOne({ conta });

        if (dados){
            
            await Conta.findOneAndDelete({ conta });

            const contasAgencia = await (await Conta.find({ agencia })).length;

            return res.send(`Conta deletada com sucesso! O número de contas em sua agência é ${contasAgencia}`);

        } else {
            return res.status(400).send({ error: 'Conta não encontrada'});
        } 

    } catch (err) {
        console.log(`printando o erro`, err);
    }
})

module.exports = app => app.use('/contas', router);