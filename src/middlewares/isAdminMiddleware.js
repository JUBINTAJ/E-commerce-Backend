import CustomError from "../utils/customError"
import asyncHandler from "./asyncHandler"


const isAdmin=asyncHandler((req,res,next)=>{

    if(req.user && req.user.role === "admin"){
        next()
    }else{
        throw new CustomError("Access denied.Admin only",403)
    }
})

export default isAdmin