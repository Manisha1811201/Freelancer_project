const mongoose =require("mongoose");

const reviewSchema=new mongoose.Schema({
    projectId:{type:String,default:null},
    clientId:{type:String,default:null},
    freelancerId:{type:String,default:null},
    rating:{type:String,default:null},
    reviewText:{type:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("reviews",reviewSchema)