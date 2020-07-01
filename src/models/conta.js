const mongoose = require('../database');

const ContaSchema = new mongoose.Schema({
    agencia: {
        type: Number,
        required: true,
    },
    conta: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
    },
    balance: {
        type: Number,
        min: 0,
        default: 0
    }
},
);

const conta = mongoose.model('conta', ContaSchema);

module.exports = conta;