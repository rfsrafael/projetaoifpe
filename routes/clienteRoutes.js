const express = require("express");
const routes = express.Router();
const ClienteController = require("../controllers/clienteController");
const auth = require("../middlewares/usuarioAuth");

routes.get("/clientes/", auth, ClienteController.listarClientes);
routes.get("/clientes/relatorio", auth, ClienteController.recuperarClientes);
routes.get("/clientes/cadastro/:id?", auth, ClienteController.cadastrarClienteGet);
routes.post("/clientes/cadastro", auth, ClienteController.cadastrarClientePost);
routes.get("/clientes/remover/:id", auth, ClienteController.removerCliente);

module.exports = routes;