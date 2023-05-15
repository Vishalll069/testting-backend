const express = require('express')
const jwt = require('jsonwebtoken');
const { Postmodel } = require('../models/post.model');
const { validation } = require('../middlewares/validation');

const route = express.Router();

route.use(validation)

route.get("/", async (req, res) => {
    try {

        let data = await Postmodel.find();
        res.status(200).send(data)

    } catch (error) {
        res.status(404).send(error)
    }
})

route.post("/", async (req, res) => {
    try {

        let data = await Postmodel.create(req.body);
        res.status(200).send({ "mag": "data succesfully created", "data": data })

    } catch (error) {
        res.status(404).send(error)
    }

})
route.get("/mypost",async(req,res)=>{
    
    try {
        
        let data = await Postmodel.find({user:req.body.user});
        
        res.status(200).send(data)
        
    } catch (error) {
        res.status(404).send(error)

        
    }
})

module.exports = {
    route
}