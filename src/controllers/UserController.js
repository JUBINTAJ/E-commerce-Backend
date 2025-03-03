import asyncHandler from "../middlewares/asyncHandler";
import { userRegister ,loginUser } from "../service/userService";
import { STATUS } from "../utils/constant";



export const regiseterUser=asyncHandler(async(req,res)=>{
    const data=req.body;
    const createuser=await userRegister(data)
    res.status(201).json({
        status:STATUS.SUCCESS,
        message:`user registered successfully`,
        user:{
            id:createuser._id,
            username:createuser.username,
            email:createuser.email
        }
    })
})


export const loginUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    const user=await loginUser(email,password)

    const accessToken  = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user) 

    res
       .cookie('accessToken',accessToken,{httpOnly : true , secure: false  , maxAge : 3 * 24 * 60 * 60 * 1000 , path:'/'})
       .cookie('refreshToken',refreshToken ,{httpOnly :true , secure : false , maxAge : 7 * 24 * 60 * 60 * 1000})
        
       .status(200).json({
        status : STATUS.SUCCESS,
        message:'user Logged in Successfull',
        user :{
            id :user._id,
            username:user.username,
            email:user.email
        },accessToken,refreshToken


       })
    })