var mongoose = require('./db');
var Schema =  mongoose.Schema;

var Categorias = new Schema({
    nome:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

var Categoria = mongoose.model('categorias', Categorias);

module.exports = Categoria;