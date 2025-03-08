import mongoose from "mongoose";
import asyncHandler from "../middlewares/asyncHandler.js";
import Cart from "../model/cartModel.js";
import { addProductToCart, getUserCart, removeProductFromCart } from "../service/cartService.js";
import { STATUS } from "../utils/constant.js";
import CustomError from "../utils/customError.js";


export const addCart=asyncHandler(async(req,res)=>{
       const {productId}=req.params;
       const userId=req.user._id
       await addProductToCart(productId,userId)

res.json({
        status:STATUS.SUCCESS,
        message:'product added successfully to cart'
    })
})






export const getCart=asyncHandler(async(req,res)=>{
       const userId=req.user._id 
       const cart=await getUserCart(userId)

    if(!cart)
        res.status(200).json({
           status:STATUS.SUCCESS,
           message:"your cart is empty"
     })
     else{
        res.status(200).json({status:STATUS.SUCCESS,message:"cart list...",cart})
     }

})





export const removeFromCart=asyncHandler(async(req,res,next)=>{
       const userId=req.user.id;
       const{productId}=req.params;
       
       if(!mongoose.Types.ObjectId.isValid(productId)){
        return next(new CustomError('invalid product ID',400))
    }
    const cart=await Cart.findOne({user:userId});

    if(!cart)
        throw new CustomError('cart not found',400);

    const productIndex=cart.products.findIndex((item)=>item.product.toString()===productId)

    if(productIndex ===-1){
        throw new CustomError("product not found in the cart",404)
    }

    cart.products.splice(productIndex, 1);
    await cart.save();

 
    res.status(200).json({message:"product removed successfully",cart})

})







export const incrementProductQuantity=asyncHandler(async(req,res)=>{
       const{productId}=req.params;
       const userId=req.user._id;
       
        await addProductToCart(productId,userId)
         res.json({
             status:STATUS.SUCCESS,
             message:'product quantity incremented successfully'
    })
})





export const decrementProductQuantity=asyncHandler(async(req,res)=>{
       const{productId}=req.params;
       const userId=req.user._id;
       const cart=await Cart.findOne({user:userId});

        if(!cart){
            throw new CustomError("cart not found",400)
        }

        const productIndex=cart.products.findIndex((item)=>item.product.toString()===productId)

        if(productIndex===-1){
            throw new CustomError('product not found in the cart',404)
        }

        const currentQuantity = cart.products[productIndex].quantity;

        if(currentQuantity>1){
        cart.products[productIndex].quantity-=1;
        await cart.save();

        res.json({status:STATUS.SUCCESS,message:"product quantity decremented successfully"})

        }else{

        await removeProductFromCart(userId,productId)

        res.json({status:STATUS.SUCCESS,message:"product removed from cart"})
    }
})