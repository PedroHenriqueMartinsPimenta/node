var mongoose = require('mongoose');
if(process.env.NODE_ENV == 'production'){
    mongoose.connect('mongodb+srv://pedrohenrique:pedrofabiana12@cluster0-ib005.mongodb.net/test?retryWrites=true&w=majority');
    
}else{

    mongoose.connect('mongodb://localhost/blogsport');
}
module.exports = mongoose;