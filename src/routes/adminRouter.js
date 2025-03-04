import express from 'express'
import isAdmin from '../middlewares/isAdminMiddleware.js'
import { allUser, orderDetails, Profit, singleUser, totalProductsPurchased, userBlock, userCount } from '../controllers/adminControllers.js'
import authenticate from '../middlewares/authMiddleware.js'

const  router=express.Router()

router.get('/allusers',authenticate,isAdmin,allUser)
router.put('/blockUser/:id',authenticate,isAdmin,userBlock)
router.get('/singleuser/:id',authenticate,isAdmin,singleUser)
router.get('/orders',authenticate,isAdmin,orderDetails)
router.get('/profit',authenticate,isAdmin,Profit)
router.get('/totalpurchase',authenticate,isAdmin,totalProductsPurchased)
router.get('/usersCount',authenticate,isAdmin,userCount)


export default router