const express = require("express");
const app = express();
app.use(express.urlencoded( {extended: true} ));
app.set('view engine', 'ejs');
app.use(express.static("public"));
require("dotenv").config();

const session = require("express-session");
app.use(session({
    secret: "ifpe2021"
}));


const auth = require("./middlewares/usuarioAuth");
const clienteRoutes = require("./routes/clienteRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI);

app.use(clienteRoutes);
app.use(usuarioRoutes);

app.get("/", auth, (req, res) => {
    const status = req.query.s;
    let mensagem = "";
    if(status == "1"){
        mensagem = "Cadastro efetuado com sucesso!";
    } 
    res.render("index", { msg: mensagem, title:"Página Inicial" });
});

app.get("/sobre", (req, res) => {
    res.render("sobre", {title: "Sobre"});
});

app.use((req, res) => {
    res.status(404).render("404", {title: "404"});
});

app.listen(process.env.PORT, () => {
    console.log("Servidor executando com sucesso IFPE!");
});