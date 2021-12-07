const Cliente = require("../models/Cliente");

module.exports = class ClienteController {

    static async listarClientes(req, res) {
        const clientes = await Cliente.find();
        res.render("clientes/listar", { clientes, title: "Clientes" });
    }

    static async recuperarClientes(req, res) {
        const clientes = await Cliente.find();
        res.render("clientes/relatorio", { clientes, title: "Relatório de Clientes" });
    }

    static async cadastrarClienteGet(req, res) {
        const id = req.params.id;
        if(id){ // atualizar
            const cliente = await Cliente.findById(id);
            res.render("clientes/cadastro", {title: "Editar Cliente", cliente});
        } else{ // inserir
            res.render("clientes/cadastro", {title: "Cadastrar Cliente", cliente: {}});
        }
    }
    
    static async cadastrarClientePost(req, res) {
        const cliente = req.body;
        console.log(cliente);
        if(cliente.id){ // atualizar
            await Cliente.findOneAndUpdate({ _id: cliente.id}, {
                nome: cliente.nome,
                endereco: cliente.endereco,
                telefone: cliente.telefone,
                email: cliente.email
            });
        } else{ // inserir
            const novoCliente = new Cliente({
                nome: cliente.nome,
                endereco: cliente.endereco,
                telefone: cliente.telefone,
                email: cliente.email
            });
            await novoCliente.save();
        }

        res.redirect("/clientes");
    }

    static async removerCliente(req, res){
        const id = req.params.id;
        await Cliente.findByIdAndDelete({ _id: id });
        res.redirect("/clientes");
    }

}
