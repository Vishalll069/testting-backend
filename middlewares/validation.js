const jwt = require('jsonwebtoken');
require('dotenv').config()
const validation = (req,res,next)=>{
    const token = req.headers.auth

    if(token){
        var decoded = jwt.verify(token, process.env.SECRETE_KEY);
        if(decoded){                                           
            let{email} = decoded;
            console.log(email)
            req.body.user = email
            next();
        }
        else{
            res.status(407).send("Login first")
        }
    }
    else{
        res.status(408).send("Login first")
    }
   
}
module.exports={
    validation
}