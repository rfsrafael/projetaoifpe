const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clienteSchema = Schema({
    nome: String,
    endereco: String,
    telefone: Number,
    email: String,
    dataCadastro: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Cliente", clienteSchema);