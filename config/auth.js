var passportStrategy = require('passport-local').Strategy;
var User = require('../modules/usuarios');
var bcrypt = require('bcrypt');

module.exports = function(passport){
    passport.use(new passportStrategy({usernameField: 'email', passwordField: 'password'}, function(email, password, done){
        User.findOne({email: email}).then(function(user){
            if(!user){
                return done(null, false, {message: "Este usuário não exite"});
            }else{
                bcrypt.compare(password, user.password, function(err, compativel){
                    if(compativel){
                        return done(null, user);
                    }else{
                        return done(null, false, {message: "Usuario ou senha incompativel"});
                    }
                });
            }
        }).catch(function(err){
            
        });
    }));

    passport.serializeUser(function(usuario, done){
        done(null, usuario.id);
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, usuario){
            done(err, usuario)
        })
    })
    
}

