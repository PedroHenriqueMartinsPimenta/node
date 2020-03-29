var mongoose = require('./db')
var Schema = mongoose.Schema;

var usuario = new Schema({
    nome:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});

var usuarioModel = mongoose.model('usuarios', usuario);

module.exports = usuarioModel;