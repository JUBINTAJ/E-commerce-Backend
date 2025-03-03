import express from 'express'
import {createValidator} from 'express-joi-validation'
import { loginUser, regiseterUser } from '../controllers/UserController'
import { loginvalidation, signupvalidation } from '../validation/userValidation'

const router= express.Router()
const validator=createValidator({passError:true})

router.post('/signup',validator.body(signupvalidation),regiseterUser)
router.post('/login',validator.body(loginvalidation),loginUser)


export default router