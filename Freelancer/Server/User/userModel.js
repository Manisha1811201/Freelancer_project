const moongoose = require("mongoose")

const userSchema = new moongoose.Schema({
    name:{type:String,default:null},
    email:{type:String,default:null},
    password:{type:String,default:null},
    userType:{type:Number,default:3},//1- admin,2- developer,3-customer
    customerId:{type:moongoose.Schema.Types.ObjectId,default:null,ref:"customers"},
    status:{type:String,default:"Active"},
    createdAt:{type:Date,default:Date.now()}
})

module.exports = new moongoose.model("users",userSchema);