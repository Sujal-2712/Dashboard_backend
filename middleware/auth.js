const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
    const token = req.cookies.jwt;
    if(!token){
        return res.json({msg:"Token not found",success:false});
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        next();
    }
    catch(err){
        return res.json({msg:"Invalid Token",success:false});
    }
    
}
module.exports=auth;