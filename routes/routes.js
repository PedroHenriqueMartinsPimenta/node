var express = require('express');
var routes = express.Router();
var bcrypt = require('bcrypt');
var Posts = require('../modules/posts');
var Categorias = require('../modules/categorias');
var Usuarios = require('../modules/usuarios');
var passport = require('passport');

routes.get('/', function(req, res){
    Posts.find().populate('categoria').then(function(posts){
        res.render('index', {posts: posts});
    }).catch(function(err){
        res.send("Error na pesquisa dos posts");
    });
});

routes.get('/post/:id', function(req, res){
    Posts.findOne({_id: req.params.id}).populate('categoria').then(function(post){
        res.render('post', {post: post});
    }).catch(function(err){
        res.send("Error ao pesquisar post: " + err);
    });
});

routes.get('/categorias', function(req, res){
    Categorias.find().then(function(categorias){
        res.render('categorias', {categorias: categorias});
    }).catch(function(err){
        res.send('Error na pesquisa de categorias: ' + err);
    });
});

routes.get('/categorias/:id', function(req, res){
    Posts.find({categoria: req.params.id}).populate('categoria').then(function(posts){
        res.render('index', {posts: posts});
    }).catch(function(err){
        res.send('Error ao pesquisar Posts: ' + err);
    });
});

routes.get('/register', function(req, res){
    res.render('register');
})

routes.post('/register', function(req, res){
   var user = new Usuarios({
        nome: req.body.nome,
        email: req.body.email,
        password: req.body.password
    });

    bcrypt.genSalt(10,function(erro, salt){
        bcrypt.hash(req.body.password, salt,function(erro, hash){
            if(!erro){
                user.password = hash;
                user.save().then(function(){
                    res.redirect('/admin/index');
                }).catch(function(err){
                    res.send("Error ao cadastrar");
                });
            }else{
                res.send('Erro ao cadastrar');
            }
        });
    });
});

routes.get('/login', function(req, res){
    res.render('login');
});

routes.post('/login', function(req, res, next){
    passport.authenticate("local",{
        successRedirect:"/",
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);
});

routes.get('/logout', function(req, res){
    req.logOut();
    res.redirect('/');
});

module.exports = routes;