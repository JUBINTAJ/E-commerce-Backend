import { required } from "joi";
import mongoose from "mongoose";


const productSchema=new mongoose.Schema({
    name:{
        type:string,
        required:true
    },price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    category:{
        type:string,
        required:true
    },
    description:{
        type:string,
        required:true
    },isDelete:{
        type:Boolean,
        default:false
    }
})


const product=mongoose.model('product',productSchema)

export default product;