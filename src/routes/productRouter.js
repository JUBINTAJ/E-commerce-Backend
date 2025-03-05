import { addProduct, deleteProduct, getAllProducts, singleProduct, updateProduct } from "../controllers/productControlle.js"
import authenticate from "../middlewares/authMiddleware.js"
import isAdmin from "../middlewares/isAdminMiddleware.js"
import { upload } from '../config/cloudinaryconfig.js'
import express from "express"; 

const productRouter=express.Router()




productRouter.get('',getAllProducts)
productRouter.get('/:id',singleProduct)



productRouter.post('/addproduct',authenticate,isAdmin,upload.single('image'),addProduct)
productRouter.patch('/updateProduct',authenticate,isAdmin,upload.single('image'),updateProduct)
productRouter.patch('/deleteProduct/:id',authenticate,isAdmin,deleteProduct)



export default productRouter;