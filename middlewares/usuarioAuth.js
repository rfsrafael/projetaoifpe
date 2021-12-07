function usuarioAuth(req, res, next){
    if(req.session.usuarioLogin){
        next();
    } else{
        res.redirect("/usuarios/login");
    }
}

module.exports = usuarioAuth;