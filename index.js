const express = require('express')
const { connect } = require('./config/db')
const { Usermodel } = require('./models/register.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const{route} = require('./routes/router');
const { validation } = require('./middlewares/validation');
const cors = require('cors')
require('dotenv').config()


const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Yee Student hai kya ?")
})


app.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;
        const isUser = await Usermodel.findOne({email});
        if(isUser){
            res.send("User already Exists !!")
        }
        else{
            bcrypt.hash(password, 4, async (err, hash)=>{
                if(err){
                    res.send("Something Went Wrong...")
                }
                let data = await Usermodel.create({...req.body, password:hash})
                res.status(200).send({ "msg": "data succesully added", "data": data })
            })
        }

    } catch (error) {
        req.status(408).send(error)
    }
})

app.post("/login", async (req, res) => {
    let { email, password } = req.body
    try {
        let data = await Usermodel.findOne({ email })
        if(data){
            console.log(data)
            bcrypt.compare(password, data.password, (err, result)=>{

                 if(result){   
                    const token = jwt.sign({email},process.env.SECRETE_KEY);
                    res.status(200).send({ "msg": "succesfully login", "token": token })            
                }
                else{
                    res.send("failed")
                }    
            })
            
        }
        else{
            res.status(408).send("User Not Found..!!!")
        }
    } catch (error) {
        res.status(405).send(error)

    }
})
// app.use(validation)   
app.use("/posts",route) 


app.listen(process.env.PORT, async () => {
    try {
        connect()
        console.log("Your server is running at http://localhost:4800")

    } catch (error) {
        console.log(error)

    }

})