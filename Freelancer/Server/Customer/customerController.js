const customer = require("./customerModel")
const user = require("../User/userModel")
const bcrypt =require("bcrypt");
const roundValue = 10;

getall=async(req,res)=>{
    totalCount=await customer.countDocuments().exec()
    customer.find()
    .then((customerData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:customerData,
            total:totalCount
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error.",
            error:err.message
        })
    })
}


getsingleData=(req,res)=>{
    let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }
    else{
        customer.findOne({_id:req.body._id})
        .then((customerData)=>{
            if(!customerData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully.",
                    data:customerData
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err.message
            })
        })
    }
}


updateData=(req,res)=>{
    let validationErrors=[];
    if(!req.body._id){
        validationErrors.push("id is required")
    }
    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationErrors
        })
    }

    else{
        customer.findOne({_id:req.body._id})
        .then((customerData)=>{
            if(!customerData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data nor found."
                })
            }
            else{
                if(req.body.name){
                    customerData.name=req.body.name
                }
                if(req.body.email){
                    customerData.email=req.body.email
                }
                if(req.body.password){
                    customerData.password=req.body.password
                }
                if(req.body.address){
                    customerData.address=req.body.address
                }
                if(req.body.contact){
                    customerData.contact=req.body.contact
                }
                customerData.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data updated successfully.",
                        data:resData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
            }
        })
         .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        error:err.message
                    })
                })
    }
}

register =(req,res)=>{

    let validationErrors = [];

    if(!req.body.name){
        validationErrors.push("Name is required")
    }
     if(!req.body.email){
        validationErrors.push("Email is required")
    }
     if(!req.body.password){
        validationErrors.push("Password is required")
    }
     if(!req.body.contact){
        validationErrors.push("Contact is required")
    }
     if(!req.body.address){
        validationErrors.push("Address is required")
    }

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            errors:validationErrors
        })
    }
    else{
        customer.findOne({email:req.body.email}).
        then((customerData)=>{
            if(!customerData){
               let userObj = new user()
               userObj.name = req.body.name
               userObj.email = req.body.email
               userObj.password = bcrypt.hashSync(req.body.password,roundValue)
               userObj.save()
               .then((userResData)=>{
                let cusObj = new customer()
               cusObj.name = req.body.name
              cusObj.email = req.body.email
              cusObj.password = req.body.password
              cusObj.contact = req.body.contact
              cusObj.address = req.body.address
              cusObj.userType = 3
              cusObj.userId = userResData._id
              cusObj.save().
              then((cusResData)=>{
                userObj.customerId = cusResData._id
                userObj.save()
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"User Registered successfully",
                        data:cusResData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })
              })
              .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })

               })
            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"User already exists",
                    data:customerData
                })
            }
        })
        .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internal server error",
                        errors:err.message
                    })
                })
    }

   
}

 module.exports = {
    register,updateData,getall,getsingleData
 }