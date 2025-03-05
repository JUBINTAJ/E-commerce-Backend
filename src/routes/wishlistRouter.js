import { addToWishlist, getAllWishlist, removeSingleWishlist } from "../controllers/wishlistController";
import authenticate from "../middlewares/authMiddleware";
import express from 'express'





const router=express.Router()

router.post('/wishlist/:productId',authenticate,addToWishlist)
router.delete('/deletewishlist/:productId',authenticate,removeSingleWishlist)
router.get('/getWishlist',authenticate,getAllWishlist)

export default router;