const jwt = require('jsonwebtoken')

function auth(req,res,next){
   
    var token = req.headers['admin_authorization'];
 
    if (token){
        
        var token = token.split(" ");
        token = token[1];
        jwt.verify(token, 'SECRET', function (err, decoded){
           
            if (err){
                res.status(400).json({msg: 'token is not valid'})  
            } else {
                req.admin = decoded;
                next();
            }
        });
    }

}

module.exports = auth