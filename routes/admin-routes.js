var express = require('express');
var routes = express.Router();
var Categoria = require('../modules/categorias');
var Post = require('../modules/posts');
var {isLogin} = require('../helpers/isLogin');

routes.get('/', isLogin, function(req, res){
    res.render('admin/index');
});

routes.get('/categorias', isLogin, function(req, res){
    Categoria.find().then(function(result){
        res.render('admin/categorias', {categorias: result});
    }).catch(function(err){
        res.send(err);
    });
});

routes.get('/categorias/add', isLogin, function(req, res){
    res.render('admin/add_categorias');
});

routes.post('/categorias/insert', isLogin, function(req, res){
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push("Nome invalido");
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push("Nome invalido");
    }
    if(erros.length == 0){
        new Categoria({
            nome: req.body.nome,
            slug: req.body.slug.replace(' ', '-')
        }).save().then(function(){
            res.redirect('/admin/categorias');
        }).catch(function(err){
            res.send(err);
        });
    }else{
        var error = "";
        erros.forEach(erro => {
            error += erro+", ";
        });
        res.send(error);
    }
});

routes.get('/categorias/update/:id', isLogin, function(req, res){
    Categoria.findOne({
        _id:req.params.id
    }).then(function(categoria){
        res.render('admin/update_categoria', {categoria: categoria});
    }).catch(function(err){
        res.send("Erro: " + err);
    });
});

routes.post('/categorias/update', isLogin, function(req, res){
    Categoria.findOne({
        _id: req.body.id
    }).then(function(categoria){
        categoria.nome = req.body.nome;
        categoria.slug = req.body.slug;
        categoria.date = Date.now();
        categoria.save().then(function(){
            res.redirect('/admin/categorias');
        }).catch(function(err){
            res.send("Error ao atualizar: " + err);
        });
    }).catch(function(err){
        res.send("Error ao atuliazar: " + err);
    });
});

routes.get('/categorias/delete/:id', isLogin, function(req, res){
    Categoria.deleteOne({
        _id:req.params.id
    }).then(function(){
        res.redirect('/admin/categorias');
    }).catch(function(err){
        res.send(err);
    });
});

routes.get('/posts', isLogin, function(req, res){
    Post.find().populate('categoria').sort({date: "desc"}).then(function(result){
        res.render('admin/posts', {posts:result});
    }).catch(function(err){
        res.send("Erro com os Posts: " + err);
    });
});

routes.get('/posts/add', isLogin, function(req, res){
    Categoria.find().then(function(result){
        res.render('admin/add_post', {categorias: result});
    }).catch(function(err){
        res.send('Error nas categorias: ' + err);
    });
});

routes.post('/posts/add', isLogin, function(req, res){
    var slug = req.body.titulo.replace(" ", "-");
    new Post({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        slug: slug,
        categoria: req.body.categoria,
        date: Date.now()
    }).save().then(function(){
        res.redirect('/admin/posts');
    }).catch(function(err){
        res.send('Erro ao cadastrar post: ' + err);
    });
});

routes.get('/posts/edit/:id', isLogin, function(req, res){
    Post.findOne({_id: req.params.id}).populate('categoria').then(function(result){
        Categoria.find().then(function(categorias){
            res.render('admin/edit_post', {post: result, categorias: categorias});
        }).catch(function(err){
            res.send('Error ao listar as categorias: ' + err);
        });
    }).catch(function(err){
        res.send('Erro ao recuperar dados: ' + err);
    });
});

routes.post('/posts/edit', isLogin, function(req, res){
    Post.findOne({_id: req.body.id}).then(function(post){
        post.titulo = req.body.titulo;
        post.slug = req.body.titulo.replace(" ", "-");
        post.conteudo = req.body.conteudo;
        post.categoria = req.body.categoria;
        post.save().then(function(){
            res.redirect('/admin/posts');
        }).catch(function(err){
            res.send("Error ao atualizar os dados: " + err);
        });
    }).catch(function(err){ 
        res.send("Error ao editar: " + err);
    });
});

routes.get('/posts/remove/:id', isLogin, function(req, res){
    Post.deleteOne({_id: req.params.id}).then(function(){
        res.redirect('/admin/posts');
    }).catch(function(err){
        res.send("Erro ao deletar: " + err);
    });
})

module.exports = routes;