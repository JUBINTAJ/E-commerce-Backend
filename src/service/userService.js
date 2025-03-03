import bcrypt from 'bcrypt'
import User from '../model/userModels'
import CustomError from '../utils/customError'

export const userRegister=async(data)=>{
    const {name,username,email,password}=data
    const userExists=await User.findOne({email})
    if(userExists){
        throw new CustomError("user already exists",400)
    }
    const hashedpassword=await bcrypt.hash(password,8)
    const newuser=new User({
        name,
        username,
        email,
        password:hashedpassword
    })
    const saveduser=await newuser.save()
    return saveduser;
}


export const loginUser=async (email,password)=>{
    const userData =await User.findOne({email})
    if(!userData){
        throw new CustomError("Please register ",400)
    }
    const isMatch =await bcrypt.compare(password ,userData.password);
    if(!isMatch){
        throw new CustomError("invalid password/email ",400)
    }
    if(userData.isBlock){
        throw new CustomError("your account is blocked ",403)
    }
    return userData
}