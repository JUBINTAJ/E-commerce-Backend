import asyncHandler from "../middlewares/asyncHandler.js";
import { loginadmin } from "../service/adminloginService.js";
import { STATUS } from "../utils/constant.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jsonWebToken.js";

export const adminLogin=asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    const admin=await loginadmin(email,password)

    const accessToken  = generateAccessToken(admin);
    const refreshToken = generateRefreshToken(admin) 

    res
       .cookie('accessdToken',accessToken,{httpOnly : true , secure: false  , maxAge : 3 * 24 * 60 * 60 * 1000 , path:'/'})
       .cookie('refreshToken',refreshToken ,{httpOnly :true , secure : false , maxAge : 7 * 24 * 60 * 60 * 1000})
        
       .status(200).json({
        status : STATUS.SUCCESS,
        message:'admin Logged in Successfull',
        admin :{
            id :admin._id,
            adminname:admin.adminname,
            email:admin.email,
        },accessToken,
        refreshToken


       })
    })