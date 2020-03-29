var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    titulo:{
        type: String,
        required: true
    },
    slug:{
        type:String,
        required:true
    },
    conteudo: {
        type:String,
        required: true    
    },
    date:{
        type: Date,
        default: Date.now()
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: "categorias"
    }
});

var Posts = mongoose.model('posts', Post);

module.exports = Posts;