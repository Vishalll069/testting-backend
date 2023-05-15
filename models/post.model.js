const mongoose = require('mongoose')

const postschema = mongoose.Schema({
    image:String,
    anime:{type:String,require:true},
    desc:String,
    user:{type:String,require:true},
})

const Postmodel = mongoose.model("post",postschema,"posts")

module.exports={Postmodel}