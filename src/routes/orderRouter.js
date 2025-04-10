import { addOrder, showOrder, verifyPayment } from "../controllers/orderController.js"
import authenticate from "../middlewares/authMiddleware.js"
import express from 'express'

const router=express.Router()

router.post('/addorder',authenticate,addOrder)
router.get('/showorder',authenticate,showOrder)
router.post("/verifypayment",authenticate,verifyPayment)


export default router;