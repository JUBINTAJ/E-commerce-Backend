import asyncHandler from "../middlewares/asyncHandler.js";
import { addProduction, deleteProductService, getAllProductService, getProductByIdService, updateProductService } from "../service/productService.js";
import { STATUS } from "../utils/constant.js";
import CustomError from "../utils/customError.js";



export const getAllProducts=asyncHandler(async(req,res)=>{

       const {category,page=1,limit=10,search}=req.query;

       const{products,pagination}=await getAllProductService({
             category, 
             page:parseInt(page,10),
             limit:parseInt(limit,10),
             search,
    })
      if(products.length===0){
            res.status(200).json({
            status:STATUS.SUCCESS,
            message:'no products found' 
        })
    }else{
        res.status(200).json({
            status:STATUS.SUCCESS,
            products,
            pagination

            })
        }
})




export const singleProduct=asyncHandler(async(req,res)=>{
    
       const{id}=req.params;
       const productOne=await getProductByIdService(id)

        if(!productOne){
             throw new CustomError("product not found",404)
       }
          res.status(200).json({
          status:STATUS.SUCCESS,
          productOne
    })
})   






export const addProduct=asyncHandler(async(req,res)=>{
       const{name,...rest}=req.body;

       let url;

       if(req.file&&req.file.path){ 
   
         url=req.file.path;    
    }else{
        return res.status(400).json({
            success:STATUS.ERROR,
            message:'image upload failed.please include a valid image file'
        })
    }

    const data=await addProduction({name,url,...rest})

    res.status(201).json({
        success:STATUS.SUCCESS,
        message:"product added successfully",
        data
    })
})
        



export const updateProduct=asyncHandler(async(req,res)=>{
       const{_id,...updateItems}=req.body

       if(!_id){
        throw new CustomError('product is not found')
    }
      const updateProduct=await updateProductService(_id,updateItems)
        res.status(200).json({
        status:STATUS.SUCCESS,
        message:'product updated successfully',
        updateProduct
     })
})




export const deleteProduct=asyncHandler(async(req,res)=>{
       const {id}=req.params;

        if(!id){
        throw new CustomError("product is not found",404)
    }

      const deleteproduct=await deleteProductService(id)
           res.json({
              status:STATUS.SUCCESS,
              message:"product deleted succesfully",
              deleteProduct
    })
})