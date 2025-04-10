import express from 'express'
import isAdmin from '../middlewares/isAdminMiddleware.js'
import { allUser, monthlySales, orderDetails, Profit, singleUser, totalProductsPurchased, userBlock, userCount } from '../controllers/adminControllers.js'
import authenticate from '../middlewares/authMiddleware.js'
import { adminLogin } from '../controllers/adminloginController.js'
import { loginvalidation } from '../validation/userValidation.js'
import {createValidator} from 'express-joi-validation'


const  router=express.Router()
const validator=createValidator({passError:true})




router.get('/allusers',authenticate,isAdmin,allUser)
router.put('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/singleuser/:id',authenticate,isAdmin,singleUser)
router.get('/orders',authenticate,isAdmin,orderDetails)
router.get('/profit',authenticate,isAdmin,Profit)
router.get('/totalpurchase',authenticate,isAdmin,totalProductsPurchased)
router.get('/usersCount',authenticate,isAdmin,userCount)
router.post('/login',validator.body(loginvalidation),adminLogin)
router.get('/sales', monthlySales);





 
export default router