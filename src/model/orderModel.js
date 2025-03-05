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
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    paymentMethod:{
        type:String,
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


const Order=mongoose.model('order',orderSchema)
export default Order; 