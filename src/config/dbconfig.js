import mongoose from "mongoose"



const dbConnect=async()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('db')
    }catch(error){
        console.log(error,'db connection')
    }
}

export default dbConnect