const express = require('express')
require('../middlewares/googleauth')
const passport = require('passport')

const oauth = express.Router()
oauth.get("/google/auth",(req,res)=>{
    passport.authenticate("google",{scope:['eamil','profile']})
    
})
oauth.get("/google/auth/callback",
passport.authenticate("google",{
    successRedirect:"/protected",
    failureRedirect:"/failure"
}))

