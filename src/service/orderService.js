import Cart from "../model/cartModel.js"
import Order from "../model/orderModel.js"
import ProductModel  from  '../model/productModels.js'
import CustomError from "../utils/customError.js"
import product from '../model/productModels.js'
import mongoose from "mongoose";

export const addOrderService=async(name,paymentMethod,userId)=>{
       const cart=await Cart.findOne({user:userId})

       if(!cart || cart.products.length===0){
        throw new CustomError('your cart is empty . add  items before placing an order"')
       }


       let total=0

       const order=new Order({
        user:userId,
        items:[],
        data:new Date(),
        name,
        paymentMethod,
        total
       })


       for (let item of cart.products){
        const product=await ProductModel .findById(item.product)
        if(!product){
            throw new CustomError(`insufficient quantity for ${product.name}`)
        }

        product.quantity-=item.quantity;
        await product.save()


        const itemTotal=product.price*item.quantity;
        total+=itemTotal;
        order.items.push({productId:item.product,quantity:item.quantity})
     }

     order.total=total;
     await order.save()

     cart.products=[]
     await cart.save()
}



export const showOrderService = async (userId, page = 1, limit = 10) => {
    if (!userId) {
        throw new CustomError("User ID is required to fetch orders", 400);
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: userId })
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .populate({
            path: "items.productId",
            model: "product",
        });


    if (!orders ) {
        throw new CustomError("No orders found", 404);
    }

    const totalOrders = await Order.countDocuments({ user: userId });

    const pagination = {
        currentPage: page,
        totalPages: Math.ceil(totalOrders / limit),
        totalOrders,
    };

    return { orders, pagination };
};