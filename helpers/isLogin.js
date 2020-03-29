module.exports = {
    isLogin: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }else{
            res.redirect('/');
        }
    }
}
