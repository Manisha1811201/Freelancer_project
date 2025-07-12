const jwt=require("jsonwebtoken");
const privateKey="privateKey123";

module.exports=(req,res,next)=>{
    const token=req.headers['autherization']
    jwt.verify(token,privateKey,function(err,result){
        if(err==null){
            res.body['tokenData']=result
            next()
        }
        else{
            res.josn({
                status:403,
                success:false,
                message:"Token not found"
            })
        }
    })
}