const project=require("./projectModel");

add=(req,res)=>{
    let validationError=[];

    if(!req.body.freelancerId){
        validationError.push("freelancer Id is required.")
    }

    if(!req.body.message){
        validationError.push("message is required.")
    }

    if(!req.body.attachments){
        validationError.push("attachments is required.")
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
                let projectObj=new project();
                projectObj.freelancerId=req.body.freelancerId
                projectObj.message=req.body.message
                projectObj.attachments=req.body.attachments
                projectObj.save()
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
}

getall=async(req,res)=>{
    totalCount=await project.countDocuments().exec()

    project.find()
    .then((projectData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:projectData,
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
        project.findOne({_id:req.body._id})
        .then((projectData)=>{
            if(!projectData){
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
                    data:projectData
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