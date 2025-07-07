const mongoose=require("mongoose");

const customerSchema=new mongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    contact:{type:String,default:null},
    location:{typr:String,default:null},
    status:{type:String,default:"Active"},
    createAt:{type:Date,default:Date.now()}
})

module.exports=new mongoose.model("customers",customerSchema)