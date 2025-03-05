import express from 'express'
import authenticate from '../middlewares/authMiddleware.js'
import { addCart, decrementProductQuantity, getCart, incrementProductQuantity, removeFromCart } from '../controllers/cartControllers.js'

const router=express.Router()



router.post('/addtocart/:productId',authenticate,addCart)
router.get('/getCart',authenticate,getCart)
router.delete('/removeFromCart/:productId',authenticate,removeFromCart)



router.put('/increment/:productId',authenticate,incrementProductQuantity)
router.put('/decrement/:productId',authenticate,decrementProductQuantity)

export default router;