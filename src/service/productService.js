import Product from "../model/productModels.js";
import CustomError from "../utils/customError.js";



export const getAllProductService=async({category,page=1,limit=10,search})=>{ 
       const query={isDelete:false}

    if(category){ 
        query.category={$regex:`^${category}$`,$options:"i"} 
    }
    if(search){   
        query.$or=[
            {name:{$regex:search,$options:"i"}},
            {category:{$regex:search,$options:"i"}},
        ]
    }


     const skip=(page-1)*limit;
     const total=await Product.countDocuments(query)

     const products=await Product.find(query).skip(skip).limit(limit);

return{
    products,
    pagination:{
        page,
        limit,
        totalPages:Math.ceil(total/limit),
    },
}
}




export const getProductByIdService=async(id)=>{
    const productDetails=await Product.findById(id);
    if(!productDetails){
        throw new CustomError('product not found',404)
    }
    return productDetails
}




export const addProduction=async({name,...rest})=>{
    
    const existingItem=await Product.findOne({name})
    
    if(existingItem){
        throw new CustomError("product already exists",400)
        
    }
    const newProduct=new Product({name,...rest})
    await newProduct.save()
    return newProduct;
}




export const updateProductService=async(_id,updateItems)=>{
    const existing=await Product.findById(_id)

    if(!existing){
        throw new CustomError('product is unavailable',400)

        const data=await Product.findByIdAndUpdate({_id,isDelete:false},{$set:{...updateItems}},{new:true}) 
        return data
    }
    
}




export const deleteProductService=async(id)=>{
    const existingProduct=await Product.findById(id)

    if(!existingProduct){
        throw new CustomError("product not found",404)
    }
    return await Product.findByIdAndUpdate(
        id,{isDelete:true},{new:true}   
    )
}