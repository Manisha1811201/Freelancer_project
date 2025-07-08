const post=require("./postModel");

add=(req,res)=>{
    let validationError=[];

    if(!req.body.title){
        validationError.push("Title is required.")
    }

    if(!req.body.description){
        validationError.push("Description is required.")
    }

    if(!req.body.deadline){
        validationError.push("Deadline is required.")
    }

    if(!req.body.clientId){
        validationError.push("Client Id is required.")
    }

    if(!req.body.budget){
        validationError.push("Budget is required.")
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
                let postObj=new post();
                postObj.title=req.body.title
                postObj.description=req.body.description
                postObj.deadline=req.body.deadline
                postObj.clientId=req.body.clientId
                postObj.budget=req.body.budget
                postObj.save()
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
    totalCount=await post.countDocuments().exec()

    post.find()
    .then((postData)=>{
        res.json({
            status:200,
            success:true,
            message:"Data loaded successfully.",
            data:postData,
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
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
                    data:postData
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


deleteData =(req,res)=>{
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                post.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"Data Deleted successfully",
                        data:postData
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
        post.findOne({_id:req.body._id})
        .then((postData)=>{
            if(!postData){
                res.json({
                    status:404,
                    success:false,
                    message:"Data not found."
                })
            }
            else{
                if(req.body.title){
                    postData.title=req.body.title
                }
                if(req.body.description){
                    postData.description=req.body.description
                }
                if(req.body.deadline){
                    postData.deadline=req.body.deadline
                }
                if(req.body.clientId){
                    postData.clientId=req.body.clientId
                }
                if(req.body.budget){
                    postData.budget=req.body.budget
                }
                postData.save()
                .then((resData)=>{
                    res.json({
                        status:200,
                        success:false,
                        message:"Data updated successfully.",
                        data:resData
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
}

module.exports={
    add,getall,getsingleData,deleteData,updateData
}