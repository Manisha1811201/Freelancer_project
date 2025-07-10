const user = require("./userModel")
const bcrypt = require("bcrypt")

login = (req,res) =>{
    let validationError = []
    if(!req.body.email){
        validationError.push("email is required")
    }
    if(!req.body.password){
        validationError.push("password is required")
    }
    if(validationError.length >0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs",
            error:validationError
        })
    }
    else{
        user.findOne({email:req.body.email})
        .then((userData) =>{
            if(!userData){
                res.json({
                    status:404,
                    success:false,
                    message:"email not exist"
                })
            }
            else{
                bcrypt.compare(req.body.password,userData.password,function(err,result){
                    if(result){
                        res.json({
                            status:200,
                            success:true,
                            message:"Login successfully",
                            data:userData
                        })
                    }
                    else{
                        res.json({
                            status:404,
                            success:false,
                            message:"password not matched"
                        })
                    }
                })
            }
        })
        .catch((err) =>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:err.message
            })
        })
    }
}

module.exports = {
    login
}