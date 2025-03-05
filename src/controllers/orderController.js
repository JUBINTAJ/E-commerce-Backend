import asyncHandler from "../middlewares/asyncHandler";
import { addOrderService, showOrderService } from "../service/orderService";
import { STATUS } from "../utils/constant";

export const  addOrder=asyncHandler(async(req,res)=>{
       const userId=req.user._id;
       const {name,address,payment}=req.body
       await addOrderService(name,address,payment,userId)

       res.status(200).json({
        status:STATUS.SUCCESS,
        message:'order placed successs'
       })
})



export const showOrder= asyncHandler(async(req,res)=>{
       const userId=req.user._id;
       const {page}=req.query;

       const {order,pagination}=await showOrderService(userId,parseInt(page,10) || 1,10)
       const message=order.length?"orders retrieved successfully " :"no order found"

       res.status(200).json({
        status:STATUS.SUCCESS,
        message,
        order,
        pagination
       })
})