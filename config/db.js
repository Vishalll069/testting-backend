const mongoose = require('mongoose')

const connect=async()=>{
    try {
        await mongoose.connect("mongodb+srv://vishaldurge567:masai@cluster0.x0skflh.mongodb.net/insta?retryWrites=true&w=majority")
        console.log("connected to server")
        
    } catch (error) {
        console.log(error)
        
    }

}
module.exports={connect}
