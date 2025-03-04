import express from 'express'
import {createValidator} from 'express-joi-validation'
import { userLogin, regiseterUser } from '../controllers/UserController.js'
import { loginvalidation, signupvalidation } from '../validation/userValidation.js'

const  router= express.Router()
const validator=createValidator({passError:true})

router.post('/signup',validator.body(signupvalidation),regiseterUser)
router.post('/login',validator.body(loginvalidation),userLogin)


export default router 