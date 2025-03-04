import { required } from "joi";
import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    wishlist:[
        {
            type:mongoose.type.ObjectId,
            ref:'product'
        }
    ]
})

const wishlist=mongoose.model('wishlist',wishlistSchema)
export default wishlist