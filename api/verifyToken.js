const jwt = require('jsonwebtoken');

function verify(req,res,next){
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        const secret = process.env.SECRET_KEY;
        jwt.verify(token,secret,(err,user)=>{
            if(err){
                return res.status(403).json({
                    message: 'Token is not valid'
                });

            }
            req.user = user;
            next();
        });
    }
}

module.exports = verify;