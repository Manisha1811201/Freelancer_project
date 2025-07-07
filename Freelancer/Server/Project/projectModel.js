const mongoose =require("mongoose");

const projectSchema=new mongoose.Schema({
    freelancerId:{type:String,default:null},
    message:{type:String,default:null},
    attachments:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("projects",projectSchema)