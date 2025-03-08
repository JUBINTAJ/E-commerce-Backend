import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true
         }, 
    price: {
         type: Number,
         required: true
         },

     img:{
          type:String,
          required:true

         },
    category: { 
        type: String 
        },
    stock: { type: Number,
     required:true
},
}, { 
    timestamps: true 
   }); 

const product = mongoose.model("product", productSchema);

export default product;
