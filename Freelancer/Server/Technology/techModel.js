const mongoose =require("mongoose");

const techSchema=new mongoose.Schema({
    technologyName:{type:String,default:null},
    description:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("technolyies",techSchema)