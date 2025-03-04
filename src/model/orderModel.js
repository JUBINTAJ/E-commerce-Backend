import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    items:[
        {
            productId:{
                type:mongoose.Types.ObjectId,
                ref:'product',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    data:{
        type:Data,
        default:Data.now,
        required:true
    },
    name:{
        type:string,
        required:true
    },
    paymentMethod:{
        type:string,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
},
{
    timestamps:true

})


const Order=mongoose.Model('order',orderSchema)
export default Order;