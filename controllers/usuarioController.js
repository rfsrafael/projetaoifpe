const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");

module.exports = class UsuarioController {

    static async loginUsuarioGet(req, res) {
        if (req.session.usuarioLogin){
            res.redirect("/");
        }else{
            res.render("usuarios/login", { title: "Login Usuário" });
        } 
    }

    static async loginUsuarioPost(req, res) {
        const usuario = req.body;
        const resultado = await Usuario.findOne({ login: usuario.login });
        
        if (resultado) { // login encontrado
            if (bcrypt.compareSync(usuario.senha, resultado.senha)) { // senha válida
                req.session.usuarioLogin = usuario.login;
                res.redirect("/");
            }else{
                res.send("Erro ao logar");
            }
        }else{
            res.send("Erro ao logar");
        }        
    }

    static async cadastrarUsuarioGet(req, res) {
        res.render("usuarios/cadastro", { title: "Cadastrar Usuário" });
    }

    static async cadastrarUsuarioPost(req, res) {
        const usuario = req.body;

        const resultado = await Usuario.findOne({ login: usuario.login });

        if (resultado) {
            res.send("Login já existente");
        } else {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(usuario.senha, salt);

            const novoUsuario = new Usuario({
                nome: usuario.nome,
                login: usuario.login,
                senha: hash
            });
            await novoUsuario.save();

            res.redirect("/usuarios/login");
        }
    }

    static async logout(req, res) {
        req.session.usuarioLogin = undefined;
        res.redirect("/usuarios/login");
    }

}
