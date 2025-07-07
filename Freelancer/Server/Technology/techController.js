const tech=require("./techModel");

add=(req,res)=>{
    let validationError=[];

    if(!req.body.technologyName){
        validationError.push("Technology name is required.")
    }

    if(!req.body.description){
        validationError.push("Description is required.")
    }

    if(validationError.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occures.",
            error:validationError
        })
    }

    else{
        tech.findOne({technologyName:req.body.technologyName})
        .then((techData)=>{
            if(!techData){
                let techObj=new tech();
                techObj.technologyName=req.body.technologyName
                techObj.description=req.body.description
                techObj.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data added Successfully",
                        data:resData
                    })
                })
                .catch((error)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"Internla server error",
                        error:error.message
                    })
                })
            }
            else{
                res.json({
                    status:422,
                    success:false,
                    message:"Data is already exites.",
                    data:techData
                })
            }
        })
        .catch((error)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server error",
                error:error.message
            })
        })
    }
}

getall=async(req,res)=>{
    totalCount=await tech.countDocuments().exec()

    tech.find()
    .then((techData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:techData,
            total:totalCount
        })
    })
    .catch((error)=>{
        res.json({
            status:500,
            success:false,
            message:"Internal server error.",
            error:error.message
        })
    })
}

getsingleData=(req,res)=>{
    let validationError=[];
    if(!req.body._id){
        validationError.push("id ia required.")
    }

    if(validationError.length>0){
        res.json({
            status:422,
            success:false,
            message:"Validation error occurs.",
            error:validationError
        })
    }

    else{
        tech.findOne({_id:req.body._id})
        .then((techData)=>{
            if(!techData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not Found"
                })
            }
            else{
                res.json({
                    status:200,
                    success:true,
                    message:"Data loaded successfully.",
                    data:techData
                })
            }
        })
        .catch((error)=>{
            res.json({
                status:500,
                success:false,
                message:"Internal server Error.",
                error:error.message
            })
        })
    }
}

module.exports={
    add,getall,getsingleData
}