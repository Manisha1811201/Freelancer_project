const view=require("./reviewModel");

add=(req,res)=>{
    let validationError=[];

    if(!req.body.projectId){
        validationError.push("project id is required.")
    }

    if(!req.body.clientId){
        validationError.push("client id is required.")
    }

    if(!req.body.freelancerId){
        validationError.push("freelancer Id is required.")
    }

    if(!req.body.rating){
        validationError.push("rating is required.")
    }

    if(!req.body.reviewText){
        validationError.push("Review Text is required.")
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
                let viewObj=new view();
                viewObj.projectId=req.body.projectId
                viewObj.clientId=req.body.clientId
                viewObj.freelancerId=req.body.freelancerId
                viewObj.rating=req.body.rating
                viewObj.reviewText=req.body.reviewText
                viewObj.save()
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
    totalCount=await view.countDocuments().exec()

    view.find()
    .then((viewData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:viewData,
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
        view.findOne({_id:req.body._id})
        .then((viewData)=>{
            if(!viewData){
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
                    data:viewData
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