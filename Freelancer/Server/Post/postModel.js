const mongoose =require("mongoose");

const postSchema=new mongoose.Schema({
    title:{type:String,default:null},
    description:{type:String,default:null},
    deadline:{type:String,default:null},
    clientId:{type:String,default:null},
    budget:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("posts",postSchema)